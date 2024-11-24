# azure_deployment.py
import os
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient
from dotenv import load_dotenv

load_dotenv()

class AzureConfig:
    """Azure-specific configuration settings"""
    
    # Azure Identity
    credential = DefaultAzureCredential()
    
    # Azure App Service settings
    APPINSIGHTS_KEY = os.getenv('APPLICATIONINSIGHTS_CONNECTION_STRING')
    
    # Blob Storage settings using managed identity
    STORAGE_ACCOUNT_URL = f"https://{os.getenv('STORAGE_ACCOUNT_NAME', 'tabannapetstorage')}.blob.core.windows.net"
    BLOB_CONTAINER_NAME = 'pet-images'
    STATIC_CONTAINER = 'static'
    
    # Database using managed identity
    DB_SERVER = os.getenv('DB_SERVER', 'tabanna-server.database.windows.net')
    DB_NAME = os.getenv('DB_NAME', 'tabanna-db')
    DB_PORT = os.getenv('DB_PORT', '1433')
    
    SQLALCHEMY_DATABASE_URI = (
        f"mssql+pyodbc://{DB_SERVER}:${DB_PORT}/{DB_NAME}"
        "?driver=ODBC+Driver+17+for+SQL+Server"
        "&authentication=ActiveDirectoryMsi"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # App settings
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', SECRET_KEY)
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # Environment settings
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    DEBUG = FLASK_ENV == 'development'
    
    # CORS settings
    CORS_ORIGINS = [
        'http://localhost:3000',  # Local development
        'https://tabanna.azurewebsites.net',  # Production
        os.getenv('FRONTEND_URL', '')
    ]

    @classmethod
    def init_blob_service(cls):
        """Initialize blob service with managed identity"""
        return BlobServiceClient(
            account_url=cls.STORAGE_ACCOUNT_URL,
            credential=cls.credential
        )