from flask import Blueprint, jsonify, request, send_from_directory
from werkzeug.utils import secure_filename
import os
from .models import Pet, User, Donation, GenderEnum, SizeEnum, PetStatusEnum  # Add necessary imports
from . import db
from .auth import token_required
from datetime import datetime

UPLOAD_FOLDER = r"./uploads"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

bp = Blueprint('routes', __name__)

@bp.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@bp.route('/api/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    pets_list = [pet.to_dict() for pet in pets]
    return jsonify(pets_list)

@bp.route('/api/pets', methods=['POST'])
@token_required
def add_pet(current_user):
    data = request.form
    image = request.files.get('file')
    new_pet = Pet(
        name=data.get('name', None),
        breed=data.get('breed', None),
        age=int(data.get('age')) if data.get('age') else None,
        owner_id=current_user.id,
        shelter_id=int(data.get('shelter_id')) if data.get('shelter_id') else None,
        category_id=int(data.get('category_id')) if data.get('category_id') else None,
        species=data.get('species', None),
        gender=GenderEnum[data.get('gender')] if data.get('gender') else None,
        size=SizeEnum[data.get('size')] if data.get('size') else None,
        health_status=data.get('health_status', None),
        is_vaccinated=data.get('is_vaccinated') == 'true' if data.get('is_vaccinated') else None,
        is_neutered=data.get('is_neutered') == 'true' if data.get('is_neutered') else None,
        location_id=int(data.get('location_id')) if data.get('location_id') else None,
        status=PetStatusEnum[data.get('status').upper()] if data.get('status') else PetStatusEnum.AVAILABLE
    )

    # Handle the uploaded image if necessary
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image.save(os.path.join(UPLOAD_FOLDER, filename))
        new_pet.image = filename
    else:
        new_pet.image = './uploads/default-pet-image.jpg'  # Ensure this path is correct

    db.session.add(new_pet)
    db.session.commit()
    return jsonify(new_pet.to_dict()), 201

@bp.route('/api/pets/<int:id>', methods=['GET'])
def get_pet(id):
    pet = Pet.query.get_or_404(id)
    pet_dict = pet.to_dict()
    owner = User.query.get(pet.owner_id)
    pet_dict['owner_username'] = owner.username if owner else None
    # Ensure all fields match PetCard.tsx interface
    return jsonify({
        'id': pet_dict.get('id'),
        'name': pet_dict.get('name'),
        'breed': pet_dict.get('breed'),
        'age': pet_dict.get('age'),
        'owner_username': pet_dict.get('owner_username'),
        'shelter_id': pet_dict.get('shelter_id'),
        'species': pet_dict.get('species'),
        'gender': pet_dict.get('gender'),
        'size': pet_dict.get('size'),
        'health_status': pet_dict.get('health_status'),
        'is_vaccinated': pet_dict.get('is_vaccinated'),
        'is_neutered': pet_dict.get('is_neutered'),
        'status': pet_dict.get('status', 'Available'),
        'created_at': pet_dict.get('created_at'),
        'category_id': pet_dict.get('category_id'),
        'image': pet_dict.get('image')
    })

@bp.route('/api/donations', methods=['POST'])
@token_required
def add_donation(current_user):
    data = request.get_json()
    new_donation = Donation(
        user_id=current_user.id,
        amount=data['amount'],
        date=datetime.now().date()
    )
    db.session.add(new_donation)
    db.session.commit()
    return jsonify({'id': new_donation.id, 'amount': new_donation.amount}), 201

@bp.route('/api/user/profile', methods=['GET'])
@token_required
def get_current_user_profile(current_user):
    user_data = current_user.to_dict()
    pets = Pet.query.filter_by(owner_id=current_user.id).all()
    pets_list = [pet.to_dict() for pet in pets]
    return jsonify({
        'user': user_data,
        'pets': pets_list
    })

@bp.route('/api/users/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())

@bp.route('/api/pets/<int:id>', methods=['DELETE'])
@token_required
def delete_pet(current_user, id):
    pet = Pet.query.get_or_404(id)
    if pet.owner_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    db.session.delete(pet)
    db.session.commit()
    return '', 204

@bp.route('/api/pets/<int:id>/adopt', methods=['PATCH'])
@token_required
def adopt_pet(current_user, id):
    pet = Pet.query.get_or_404(id)
    if pet.owner_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    pet.status = PetStatusEnum.ADOPTED
    db.session.commit()
    return jsonify(pet.to_dict()), 200

@bp.route('/api/user/donations', methods=['GET'])
@token_required
def get_user_donations(current_user):
    donations = Donation.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        'id': donation.id,
        'amount': donation.amount,
        'date': donation.date.isoformat()
    } for donation in donations])

# Register the blueprint in your create_app function
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    with app.app_context():
        from . import routes
        app.register_blueprint(routes.bp)
        db.create_all()
    return app