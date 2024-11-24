from app import db
from app.models import User, Pet, Shelter, PetCategory, Location, Post
from datetime import datetime

def create_sample_data():
    # Clear existing data
    db.session.query(Post).delete()
    db.session.query(Pet).delete()
    db.session.query(User).delete()
    db.session.query(Shelter).delete()
    db.session.query(PetCategory).delete()
    db.session.query(Location).delete()
    db.session.commit()
    
    # Create sample data
    # ...existing sample data creation code...

def reset_and_seed_database():
    try:
        db.create_all()
        create_sample_data()
        print("Database reset and seeded successfully!")
    except Exception as e:
        print(f"Error resetting database: {str(e)}")
        db.session.rollback()
        raise
