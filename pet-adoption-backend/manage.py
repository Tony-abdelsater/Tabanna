import os

class Config:
    # Other configurations...

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('AZURE_MYSQL_USER')}:{os.getenv('AZURE_MYSQL_PASSWORD')}"
        f"@{os.getenv('AZURE_MYSQL_HOST')}/{os.getenv('AZURE_MYSQL_NAME')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Azure Storage configurations
    AZURE_STORAGE_CONNECTION_STRING = os.getenv('AZURE_STORAGE_CONNECTION_STRING')
    BLOB_CONTAINER_NAME = os.getenv('BLOB_CONTAINER_NAME')
    STATIC_CONTAINER = os.getenv('STATIC_CONTAINER', 'static')
