import os
from flask import Flask, request, g, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS
from werkzeug.middleware.shared_data import SharedDataMiddleware
from .config import Config
from .routes import bp as routes_bp


app = Flask(__name__)

app.wsgi_app = ProxyFix(
    app.wsgi_app,
    x_for=1,      # Number of proxies for X-Forwarded-For
    x_proto=1,    # Number of proxies for X-Forwarded-Proto
    x_host=1,     # Number of proxies for X-Forwarded-Host
    x_port=1      # Number of proxies for X-Forwarded-Port
)

# 2. CORS Middleware
CORS(app, resources={
    r"/api/*": {
        "origins": [os.environ.get('WEBSITE_HOSTNAME', '*')],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

app.wsgi_app = SharedDataMiddleware(app.wsgi_app, {
    '/uploads': os.path.join(os.path.dirname(__file__), 'uploads')
})

# Load config
app.config.from_object(Config)
db = SQLAlchemy(app)

# Register blueprints
app.register_blueprint(routes_bp)

# Ensure the database is created
with app.app_context():
    db.create_all()



ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']]
CSRF_TRUSTED_ORIGINS = [os.environ['WEBSITE_HOSTNAME']]
DEBUG = False

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
