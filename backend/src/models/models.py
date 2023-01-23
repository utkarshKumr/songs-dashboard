from src import db
class songs(db.Model):
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    song_id = db.Column(db.String, unique = True)
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
