from src import init_app
from src.database.create_songs import insert_dummy_data
app = init_app()

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug = True)