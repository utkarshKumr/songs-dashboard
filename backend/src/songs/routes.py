from flask import Blueprint, request, jsonify
from sqlalchemy.ext.declarative import DeclarativeMeta
import json
from src.models.models import songs
from src import db
import math

class AlchemyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data) # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)

bp = Blueprint('songs', __name__)

@bp.route('/')
def index():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    count = songs.query.count()
    all_songs = songs.query.paginate(page=page, per_page=per_page).items
    sol = json.dumps(all_songs, cls=AlchemyEncoder)

    next_ = count>(page*per_page)
    return {"data": json.loads(sol), "next": next_, "page": page, "pageLimit": per_page, "totalPages":math.ceil(count/per_page)}

@bp.route('/update_star_rating/<string:song_id>', methods = ['PUT'])
def update_star_rating(song_id):
    data = request.data
    data = json.loads(data)
    star_rating = int(data['star_rating'])
    song = songs.query.filter(songs.song_id == str(song_id)).first()
    setattr(song,'star_rating', star_rating)
    db.session.merge(song)
    db.session.commit()
    return {}

@bp.route('/view/<string:title>', methods = ['GET'])
def view(title):
    song = songs.query.filter(songs.title == str(title)).first()
    sol = json.dumps(song, cls=AlchemyEncoder)
    return sol


