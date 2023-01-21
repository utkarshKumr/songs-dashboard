# save this as app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vivpro_project.db'
app.config['SECRET_KEY'] = "check"

db = SQLAlchemy(app)
class songs(db.Model):
    index = db.Column('student_id', db.Integer)
    id = db.Column(db.String, unique=True, primary_key = True)
    title = db.Column(db.String)
    danceability = db.Column(db.Float)  
    energy = db.Column(db.Float)  
    mode = db.Column(db.Integer)
    acousticness = db.Column(db.Float)  
    tempo = db.Column(db.Float)
    duration_ms = db.Column(db.Integer)
    num_sections = db.Column(db.Integer)
    num_segments = db.Column(db.Integer)
    star_rating = db.Column(db.Integer)

    def __init__(self, id, title, danceability, energy, mode, acousticness, tempo, duration_ms, num_sections, num_segments, star_rating):
        self.id = id
        self.title = title
        self.danceability = danceability
        self.energy = energy
        self.mode = mode
        self.acousticness = acousticness
        self.tempo = tempo
        self.duration_ms = duration_ms
        self.num_sections = num_sections
        self.num_segments = num_segments
        self.star_rating = star_rating


@app.route("/")
def hello():
    return "Hello, World!"

if __name__ == '__main__':
   db.create_all()
   app.run(debug = True)