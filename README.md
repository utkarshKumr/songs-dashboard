# Songs Dashboard

## Steps for backend

1. ```cd backend```
2. ```pip install -r requirements.txt```
3. ```python insert.py``` - to migrate the data
4. ```python main.py``` - it will run the backend at localhost:5000

## Steps for frontend
1. ```cd frontend```
2. ```npm install``` - to install the dependencies
3. ```npm start``` - to start the application in development mode - ```localhost:3000```.
4. If you want to change the *backend* endpoint, update ```BASE_URL``` in ```frontend/src/urls/index```. It is pointed to ```localhost:5000``` by default.

# Highlights
1. Implemented pagination in API.
2. Implemented star rating - frontend and backend (PUT API call).
3. All the charts are implemented in the frontend.
4. Table is horizontally scrollable.
