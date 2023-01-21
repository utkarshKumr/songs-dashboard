from flask import jsonify, Blueprint
import json
from src.models.models import songs

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
    songs1 = songs.query.all()
    sol = json.dumps(songs1, cls=AlchemyEncoder)
    return sol