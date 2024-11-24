# azure_deployment.py
import os
import logging
from logging.handlers import RotatingFileHandler
from applicationinsights.flask.ext import AppInsights
from azure.storage.blob import BlobServiceClient
from flask import Flask, request
from dotenv import load_dotenv

load_dotenv()

class AzureConfig:
    # Azure App Service settings
    APPINSIGHTS_KEY = os.getenv('APPLICATIONINSIGHTS_CONNECTION_STRING')
    AZURE_STORAGE_CONNECTION_STRING = os.getenv('AZURE_STORAGE_CONNECTION_STRING')
    BLOB_CONTAINER_NAME = os.getenv('BLOB_CONTAINER_NAME', 'pet-images')
    
    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv('AZURE_DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # App settings 
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # CORS settings
    CORS_ORIGINS = [os.getenv('FRONTEND_URL', 'https://your-app.azurewebsites.net')]

def setup_azure_blob(app):
    """Configure Azure Blob Storage for file uploads"""
    try:
        blob_service = BlobServiceClient.from_connection_string(
            app.config['AZURE_STORAGE_CONNECTION_STRING']
        )
        container = blob_service.get_container_client(app.config['BLOB_CONTAINER_NAME'])
        
        # Create container if not exists
        if not container.exists():
            container.create_container()
            
        app.blob_service = blob_service
        app.logger.info('Azure Blob Storage configured successfully')
    except Exception as e:
        app.logger.error(f'Error configuring Azure Blob Storage: {str(e)}')
        raise

def configure_app(app):
    """Configure Flask application for Azure"""
    
    # Basic config
    app.config.from_object(AzureConfig)
    
    # Azure Application Insights
    if app.config['APPINSIGHTS_KEY']:
        appinsights = AppInsights(app)
        app.logger.info('Application Insights configured')
        
        @app.after_request
        def after_request(response):
            appinsights.flush()
            return response
    
    # Configure logging
    if not app.debug:
        stream_handler = logging.StreamHandler()
        stream_handler.setLevel(logging.INFO)
        app.logger.addHandler(stream_handler)
        
        app.logger.setLevel(logging.INFO)
        app.logger.info('Pet Adoption startup')
    
    # Setup Azure Blob Storage
    setup_azure_blob(app)
    
    return app

def create_app():
    """Application factory with Azure configuration"""
    from app import create_app as create_base_app
    
    app = create_base_app()
    app = configure_app(app)
    
    return app