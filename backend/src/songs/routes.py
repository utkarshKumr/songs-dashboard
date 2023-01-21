from flask import Blueprint, request, jsonify
import json
from src.models.models import songs
from src import db

from sqlalchemy.ext.declarative import DeclarativeMeta

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
    print(request.args)
    all_songs = songs.query.all()
    sol = json.dumps(all_songs, cls=AlchemyEncoder)
    return sol

@bp.route('/view/<string:title>', methods = ['GET'])
def view(title):
    song = songs.query.filter(songs.title == str(title)).first()
    sol = json.dumps(song, cls=AlchemyEncoder)
    return sol
