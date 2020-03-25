from flask import Flask
from sqlalchemy import create_engine

from environment_vars import POSTGRES_DB, POSTGRES_PW, POSTGRES_URL, POSTGRES_USER
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
app = Flask(__name__)
DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)
engine = create_engine(DB_URL)

from app import routes

# creates all the models as tables in the Database
Base.metadata.create_all(engine)