import os
import urllib.parse

password = '55azure55@'
encoded_password = urllib.parse.quote_plus(password)


class Config:
    SQLALCHEMY_DATABASE_URI = (
    f'mysql+mysqlconnector://aboueltout:{encoded_password}@tabanna-mysql-server.mysql.database.azure.com/pet-adoption-db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False