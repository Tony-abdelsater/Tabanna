from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Add this import
from .config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)  # Add this line to enable CORS
    db.init_app(app)
    with app.app_context():
        from . import routes
        from . import auth
        
        app.register_blueprint(routes.bp)  # Register the blueprint
        app.register_blueprint(auth.auth_bp)
        db.create_all()
    return app