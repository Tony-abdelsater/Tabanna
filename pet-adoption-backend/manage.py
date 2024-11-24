import os
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from azure.storage.blob import BlobServiceClient
from app import create_app, db
from azure_deployment import AzureConfig

# Create app instance using factory
app = create_app()
manager = Manager(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Add database migration commands
manager.add_command('db', MigrateCommand)

@manager.command
def create_tables():
    """Create database tables."""
    db.create_all()
    print('Database tables created')

@manager.command
def drop_tables():
    """Drop all database tables."""
    if app.config.get('ENV') != 'production':
        db.drop_all()
        print('Database tables dropped')
    else:
        print('This command is disabled in production')

@manager.command
def init_azure_storage():
    """Initialize Azure Blob Storage containers"""
    try:
        connection_string = app.config['AZURE_STORAGE_CONNECTION_STRING']
        container_name = app.config['BLOB_CONTAINER_NAME']
        
        blob_service = BlobServiceClient.from_connection_string(connection_string)
        container_client = blob_service.get_container_client(container_name)
        
        if not container_client.exists():
            container_client.create_container(
                public_access='blob'  # Makes blobs publicly readable
            )
            print(f'Container {container_name} created successfully')
        else:
            print(f'Container {container_name} already exists')
            
    except Exception as e:
        print(f'Error initializing Azure Storage: {str(e)}')

@manager.command
def collectstatic():
    """Collect static files to Azure Blob Storage"""
    try:
        connection_string = app.config['AZURE_STORAGE_CONNECTION_STRING']
        container_name = app.config.get('STATIC_CONTAINER', 'static')
        
        blob_service = BlobServiceClient.from_connection_string(connection_string)
        container_client = blob_service.get_container_client(container_name)
        
        # Create container if not exists
        if not container_client.exists():
            container_client.create_container(public_access='blob')
        
        # Path to your static files
        static_folder = os.path.join(app.root_path, 'static')
        
        # Upload all static files
        for root, dirs, files in os.walk(static_folder):
            for file in files:
                file_path = os.path.join(root, file)
                blob_path = os.path.relpath(file_path, static_folder)
                
                # Replace Windows path separators with forward slashes
                blob_path = blob_path.replace('\\', '/')
                
                # Upload file
                with open(file_path, 'rb') as data:
                    blob_client = container_client.get_blob_client(blob_path)
                    blob_client.upload_blob(data, overwrite=True)
                    
                print(f'Uploaded: {blob_path}')
                
        print('Static files collected successfully')
        
    except Exception as e:
        print(f'Error collecting static files: {str(e)}')

@manager.command
def create_superuser():
    """Create a superuser account"""
    from app.models import User
    
    if os.environ.get('ADMIN_EMAIL') and os.environ.get('ADMIN_PASSWORD'):
        try:
            admin = User(
                username='admin',
                email=os.environ.get('ADMIN_EMAIL'),
                is_admin=True
            )
            admin.set_password(os.environ.get('ADMIN_PASSWORD'))
            db.session.add(admin)
            db.session.commit()
            print('Superuser created successfully')
        except Exception as e:
            print(f'Error creating superuser: {str(e)}')
    else:
        print('ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment')

@manager.command
def test():
    """Run unit tests"""
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)

if __name__ == '__main__':
    manager.run()