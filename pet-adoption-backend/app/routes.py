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
    data = request.get_json()
    new_pet = Pet(
        name=data['name'],
        breed=data['breed'],
        age=data['age'],
        owner_id=data['owner_id'],
        shelter_id=data['shelter_id']
    )
    db.session.add(new_pet)
    db.session.commit()
    return jsonify(new_pet.to_dict()), 201

@bp.route('/api/pets/<int:id>', methods=['GET'])
def get_pet(id):
    pet = Pet.query.get_or_404(id)
    return jsonify(pet.to_dict())

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