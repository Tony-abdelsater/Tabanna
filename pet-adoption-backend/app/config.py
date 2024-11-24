import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:0000@localhost/pet_adoption_db1'
    SQLALCHEMY_TRACK_MODIFICATIONS = False