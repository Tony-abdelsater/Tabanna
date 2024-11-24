import os
from dotenv import load_dotenv

load_dotenv()

class AzureConfig:
    """Azure-specific configuration settings"""
    
    # Azure App Service settings
    APPINSIGHTS_KEY = os.getenv('APPLICATIONINSIGHTS_CONNECTION_STRING')
    AZURE_STORAGE_CONNECTION_STRING = os.getenv('AZURE_STORAGE_CONNECTION_STRING')
    BLOB_CONTAINER_NAME = os.getenv('BLOB_CONTAINER_NAME', 'pet-images')
    STATIC_CONTAINER = os.getenv('STATIC_CONTAINER', 'static')
    
    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv('AZURE_DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # App settings
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # CORS settings
    CORS_ORIGINS = [os.getenv('FRONTEND_URL', 'https://your-app.azurewebsites.net')]