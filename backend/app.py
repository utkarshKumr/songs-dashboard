# save this as app.py
from flask import Flask, flash
from flask_sqlalchemy import SQLAlchemy

import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vivpro_project.db'
app.config['SECRET_KEY'] = "check"

db = SQLAlchemy(app)

class songs(db.Model):
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    song_id = db.Column(db.String)
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

    def __init__(self, song_id, title, danceability, energy, mode, acousticness, tempo, duration_ms, num_sections, num_segments, star_rating):
        self.song_id = song_id
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

@app.route('/')
def show_all():
    songs1 = songs.query.all()
    return songs1


with app.app_context():
    db.drop_all()
    db.create_all()
    json_file = open('playlist.json')
    data = json.load(json_file)
    if isinstance(data, dict):
        key1 = list(data)[0]
        num_of_rows = len(data[key1])
        rows = [{} for _ in range(num_of_rows)]
        for key, values in data.items():
            for i in range(num_of_rows):
                rows[i][key] = values[str(i)]

        print(rows[0], rows[1])
        for row in rows:
            song = songs(row['id'], row['title'], row['danceability'], row['energy'], row['mode'],
                        row['acousticness'], row['tempo'], row['duration_ms'], row['num_sections'], row['num_segments'], 0)
            db.session.add(song)
        db.session.commit()
        flash('Record was successfully added')
    
    app.run(debug = True)