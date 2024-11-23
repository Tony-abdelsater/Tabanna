from app import create_app, db
from app.models import User, Pet, Shelter

app = create_app()

def populate_database():
    # Create sample shelters
    shelter1 = Shelter(name="Happy Tails Shelter", address="1234 Bark St")
    shelter2 = Shelter(name="Paws and Claws Shelter", address="5678 Meow Ave")

    # Create sample users
    user1 = User(username="john_doe", email="john@example.com")
    user2 = User(username="jane_doe", email="jane@example.com")

    # Create sample pets
    pet1 = Pet(name="Buddy", breed="Golden Retriever", age=3, imageBase64=None, owner=user1, shelter=shelter1)
    pet2 = Pet(name="Mittens", breed="Siamese", age=2, imageBase64=None, owner=user2, shelter=shelter2)

    # Add to session and commit
    db.session.add_all([shelter1, shelter2, user1, user2, pet1, pet2])
    db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)