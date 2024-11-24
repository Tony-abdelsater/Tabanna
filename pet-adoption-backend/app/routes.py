from flask import Blueprint, jsonify, request
from .models import Pet
from . import db

bp = Blueprint('routes', __name__)

@bp.route('/api/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    pets_list = [pet.to_dict() for pet in pets]
    return jsonify(pets_list)


@bp.route('/api/pets', methods=['POST'])
def add_pet():
    data = request.form
    image = request.files.get('file')
    new_pet = Pet(
        name=data.get('name', None),
        breed=data.get('breed', None),
        age=int(data.get('age')) if data.get('age') else None,
        owner_id=int(data.get('owner_id')) if data.get('owner_id') else None,
        shelter_id=int(data.get('shelter_id')) if data.get('shelter_id') else None,
        category_id=int(data.get('category_id')) if data.get('category_id') else None,
        species=data.get('species', None),
        gender=data.get('gender', None),
        size=data.get('size', None),
        health_status=data.get('health_status', None),
        is_vaccinated=data.get('is_vaccinated') == 'true' if data.get('is_vaccinated') else None,
        is_neutered=data.get('is_neutered') == 'true' if data.get('is_neutered') else None,
        location_id=int(data.get('location_id')) if data.get('location_id') else None,
        status=data.get('status', 'Available')
    )

    # Handle the uploaded image if necessary
    if image:
        # Save the image or process it as needed
        # Example:
        # image.save(os.path.join(UPLOAD_FOLDER, secure_filename(image.filename)))
        pass

    db.session.add(new_pet)
    db.session.commit()
    return jsonify(new_pet.to_dict()), 201

@bp.route('/api/pets/<int:id>', methods=['GET'])
def get_pet(id):
    pet = Pet.query.get_or_404(id)
    return jsonify(pet.to_dict())

@bp.route('/api/donations', methods=['POST'])
def add_donation():
    data = request.get_json()
    new_donation = Donation(
        user_id=data['user_id'],
        amount=data['amount'],
        date=datetime.now().date()
    )
    db.session.add(new_donation)
    db.session.commit()
    return jsonify({'id': new_donation.id, 'amount': new_donation.amount}), 201

@bp.route('/api/users/<int:id>', methods=['GET'])
def get_user_profile(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())

@bp.route('/api/pets/<int:id>', methods=['DELETE'])
def delete_pet(id):
    pet = Pet.query.get_or_404(id)
    db.session.delete(pet)
    db.session.commit()
    return '', 204
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