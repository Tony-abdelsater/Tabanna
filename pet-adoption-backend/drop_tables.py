from app import db, create_app
from sqlalchemy import text

app = create_app()

def drop_all_tables():
    with app.app_context():
        try:
            # Drop all tables using raw SQL to bypass foreign key constraints
            conn = db.engine.connect()
            conn.execute(text("SET FOREIGN_KEY_CHECKS = 0;"))
            
            # Get all table names
            tables = db.engine.table_names()
            
            # Drop each table
            for table in tables:
                conn.execute(text(f"DROP TABLE IF EXISTS {table};"))
            
            conn.execute(text("SET FOREIGN_KEY_CHECKS = 1;"))
            conn.commit()
            print("All tables dropped successfully!")
            
        except Exception as e:
            print(f"Error dropping tables: {str(e)}")
            raise

if __name__ == "__main__":
    drop_all_tables()