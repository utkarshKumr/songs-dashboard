from src import init_app
from src.models.models import songs
import json

def insert_dummy_data():
    app = init_app(True)
    from src import db
    with app.app_context():
        json_file = open('src/database/playlist.json')
        print(json_file)
        data = json.load(json_file)
        if isinstance(data, dict):
            key1 = list(data)[0]
            num_of_rows = len(data[key1])
            rows = [{} for _ in range(num_of_rows)]
            for key, values in data.items():
                for i in range(num_of_rows):
                    rows[i][key] = values[str(i)]

            for row in rows:
                song = songs(row['id'], row['title'], row['danceability'], row['energy'], row['mode'],
                            row['acousticness'], row['tempo'], row['duration_ms'], row['num_sections'], row['num_segments'], 0)
                db.session.add(song)
            db.session.commit()

# if __name__ == "__main__":
#     insert_dummy_data()