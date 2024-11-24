# manage.py
import os
import click
from flask.cli import FlaskGroup
from azure.storage.blob import BlobServiceClient
from app import create_app, db
from azure_deployment import AzureConfig

def create_cli_app():
    return create_app()

cli = FlaskGroup(create_app=create_cli_app)

@cli.command()
def create_tables():
    """Create database tables."""
    db.create_all()
    click.echo('Database tables created')

@cli.command()
def drop_tables():
    """Drop all database tables."""
    if create_cli_app().config.get('ENV') != 'production':
        db.drop_all()
        click.echo('Database tables dropped')
    else:
        click.echo('This command is disabled in production')

@cli.command()
def init_azure_storage():
    """Initialize Azure Blob Storage containers"""
    app = create_cli_app()
    try:
        connection_string = app.config['AZURE_STORAGE_CONNECTION_STRING']
        container_name = app.config['BLOB_CONTAINER_NAME']
        
        blob_service = BlobServiceClient.from_connection_string(connection_string)
        container_client = blob_service.get_container_client(container_name)
        
        if not container_client.exists():
            container_client.create_container(
                public_access='blob'  # Makes blobs publicly readable
            )
            click.echo(f'Container {container_name} created successfully')
        else:
            click.echo(f'Container {container_name} already exists')
            
    except Exception as e:
        click.echo(f'Error initializing Azure Storage: {str(e)}')

@cli.command()
def collectstatic():
    """Collect static files to Azure Blob Storage"""
    app = create_cli_app()
    try:
        connection_string = app.config['AZURE_STORAGE_CONNECTION_STRING']
        container_name = app.config.get('STATIC_CONTAINER', 'static')
        
        blob_service = BlobServiceClient.from_connection_string(connection_string)
        container_client = blob_service.get_container_client(container_name)
        
        if not container_client.exists():
            container_client.create_container(public_access='blob')
        
        static_folder = os.path.join(app.root_path, 'static')
        
        for root, dirs, files in os.walk(static_folder):
            for file in files:
                file_path = os.path.join(root, file)
                blob_path = os.path.relpath(file_path, static_folder)
                blob_path = blob_path.replace('\\', '/')
                
                with open(file_path, 'rb') as data:
                    blob_client = container_client.get_blob_client(blob_path)
                    blob_client.upload_blob(data, overwrite=True)
                    
                click.echo(f'Uploaded: {blob_path}')
                
        click.echo('Static files collected successfully')
        
    except Exception as e:
        click.echo(f'Error collecting static files: {str(e)}')

@cli.command()
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
            click.echo('Superuser created successfully')
        except Exception as e:
            click.echo(f'Error creating superuser: {str(e)}')
    else:
        click.echo('ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment')

@cli.command()
def test():
    """Run unit tests"""
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)

if __name__ == '__main__':
    cli()