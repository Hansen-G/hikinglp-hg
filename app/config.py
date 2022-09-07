import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    S3_BUCKET= os.environ.get("S3_BUCKET")
    S3_KEY= os.environ.get("S3_KEY")
    S3_SECRET= os.environ.get("S3_SECRET_ACCESS_KEY")
    REACT_APP_NPS_API_KEY = os.environ.get("REACT_APP_NPS_API_KEY")
    REACT_APP_GOOGLE_MAPS_API_KEY= os.environ.get("REACT_APP_GOOGLE_MAPS_API_KEY")
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True

