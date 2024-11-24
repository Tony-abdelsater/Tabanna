from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from datetime import datetime, timedelta
import jwt
from functools import wraps
from .models import User
from . import db

auth_bp = Blueprint('auth', __name__)

# Configure JWT
JWT_SECRET_KEY = 'your-secret-key'  # Change this to a secure secret key
JWT_EXPIRATION_HOURS = 24

def create_token(user_id):
    expiration = datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    return jwt.encode(
        {'user_id': user_id, 'exp': expiration},
        JWT_SECRET_KEY,
        algorithm='HS256'
    )

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or not token.startswith('Bearer '):
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            token = token.split('Bearer ')[1]
            data = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing credentials'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    token = create_token(user.id)
    return jsonify({
        'token': token,
        'user_id': user.id,
        'username': user.username
    })

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already taken'}), 400
    
    new_user = User(
        username=data['username'],
        email=data['email']
    )
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    
    token = create_token(new_user.id)
    
    return jsonify({
        'token': token,
        'user_id': new_user.id,
        'username': new_user.username
    }), 201

# Remove or comment out this duplicate route since it's now handled in routes.py
# @auth_bp.route('/api/user/profile', methods=['GET'])
# @token_required
# def get_profile(current_user):
#     return jsonify(current_user.to_dict())