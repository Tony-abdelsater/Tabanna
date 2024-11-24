
from app import db, create_app

app = create_app()

with app.app_context():
    # This will drop all tables
    db.drop_all()
    print("All tables have been dropped successfully!")