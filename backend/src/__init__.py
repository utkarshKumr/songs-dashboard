from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Database setup
db = SQLAlchemy()

def init_app(drop = False):
    app = Flask(__name__)
    CORS(app)
    # app.config.from_object('src.config.Config') 
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vivpro_project.db'
    app.config['SECRET_KEY'] = "check"
    
    db.init_app(app)
    
    with app.app_context():
        if drop:
            db.drop_all()
        db.create_all()
        from src.songs.routes import bp as songs_bp
        app.register_blueprint(songs_bp)
        return app