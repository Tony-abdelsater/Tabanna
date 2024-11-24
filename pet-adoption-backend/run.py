from app import create_app, db
from app.models import User, Pet, Shelter, PetCategory, Location, GenderEnum, SizeEnum, PetStatusEnum

app = create_app()

def populate_database():
    with app.app_context():
        db.drop_all()
        db.create_all()
        # Create sample locations
        location1 = Location(city="New York", state="NY", country="USA")
        location2 = Location(city="Los Angeles", state="CA", country="USA")

        # Create sample shelters
        shelter1 = Shelter(name="Happy Tails Shelter", address="1234 Bark St")
        shelter2 = Shelter(name="Paws and Claws Shelter", address="5678 Meow Ave")

        # Create sample categories
        category1 = PetCategory(name="Dog", description="Domestic dogs")
        category2 = PetCategory(name="Cat", description="Domestic cats")

        # Create sample users
        user1 = User(username="john_doe", email="john@example.com", first_name="John", last_name="Doe", location=location1)
        user2 = User(username="jane_doe", email="jane@example.com", first_name="Jane", last_name="Doe", location=location2)

        # Create sample pets
        pet1 = Pet(
            name="Buddy", breed="Golden Retriever", age=3, owner=user1, shelter=shelter1, category=category1,
            species="Dog", gender=GenderEnum.MALE, size=SizeEnum.LARGE, health_status="Healthy",
            is_vaccinated=True, is_neutered=True, location=location1, status=PetStatusEnum.AVAILABLE,
            image='default-pet-image.jpg'  # Add this line
        )
        pet2 = Pet(
            name="Mittens", breed="Siamese", age=2, owner=user2, shelter=shelter2, category=category2,
            species="Cat", gender=GenderEnum.FEMALE, size=SizeEnum.SMALL, health_status="Healthy",
            is_vaccinated=True, is_neutered=False, location=location2, status=PetStatusEnum.AVAILABLE,
            image='default-pet-image.jpg'  # Add this line
        )

        # Add to session and commit
        db.session.add_all([location1, location2, shelter1, shelter2, category1, category2, user1, user2, pet1, pet2])
        db.session.commit()

if __name__ == '__main__':
    # populate_database()
    app.run(debug=True)