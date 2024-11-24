from datetime import datetime
from . import db
from enum import Enum
from werkzeug.security import generate_password_hash, check_password_hash

class GenderEnum(str, Enum):
    MALE = 'Male'
    FEMALE = 'Female'
    UNKNOWN = 'Unknown'

class SizeEnum(str, Enum):
    SMALL = 'Small'
    MEDIUM = 'Medium' 
    LARGE = 'Large'

class PetStatusEnum(str, Enum):
    AVAILABLE = 'Available'
    PENDING = 'Pending'
    ADOPTED = 'Adopted'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    pets = db.relationship('Pet', backref='owner', lazy=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    password_hash = db.Column(db.String(255))
    phone = db.Column(db.String(20))
    address = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    posts = db.relationship('Post', backref='author', lazy=True)
    location_id = db.Column(db.Integer, db.ForeignKey('location.id'))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'address': self.address,
            'created_at': self.created_at
        }

class PetCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    pets = db.relationship('Pet', backref='category', lazy=True)

class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    breed = db.Column(db.String(100), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelter.id'), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('pet_category.id'), nullable=True)
    species = db.Column(db.String(50), nullable=True)
    gender = db.Column(db.Enum(GenderEnum), nullable=True)
    size = db.Column(db.Enum(SizeEnum), nullable=True)
    health_status = db.Column(db.String(100), nullable=True)
    is_vaccinated = db.Column(db.Boolean, nullable=True)
    is_neutered = db.Column(db.Boolean, nullable=True)
    location_id = db.Column(db.Integer, db.ForeignKey('location.id'), nullable=True)
    status = db.Column(db.Enum(PetStatusEnum), default=PetStatusEnum.AVAILABLE)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    image = db.Column(db.String(255), nullable=True)  # Add this line
    posts = db.relationship('Post', backref='pet', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'breed': self.breed,
            'age': self.age,
            'owner_id': self.owner_id,
            'shelter_id': self.shelter_id,
            'category_id': self.category_id,
            'species': self.species,
            'gender': self.gender.name if self.gender else None,
            'size': self.size.name if self.size else None,
            'health_status': self.health_status,
            'is_vaccinated': self.is_vaccinated,
            'is_neutered': self.is_neutered,
            'location_id': self.location_id,
            'status': self.status.name,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'image': self.image  # Add this line
        }

class Shelter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    pets = db.relationship('Pet', backref='shelter', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address
        }


class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    users = db.relationship('User', backref='location', lazy=True)
    pets = db.relationship('Pet', backref='location', lazy=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    post_date = db.Column(db.DateTime, default=datetime.utcnow)