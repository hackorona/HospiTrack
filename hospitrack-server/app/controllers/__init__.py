from sqlalchemy.orm import sessionmaker
from app import engine

Session = sessionmaker(bind=engine)
session = Session()