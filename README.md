<H1>Setting up Backend [Django]</H1>

1. Create a virtual environment in route directory.

`python -m venv env`


2. Activate virtual environment.

`env\Scripts\activate` or `source env/bin/activate` for Windows and macOS/Linux respectively.


3. Install dependencies.

`pip install -r requirements.txt`

4. Inside of backend, migrate database.

`python manage.py migrate`

5. Run the Django development server.

`python manage.py runserver`


<H1>Setting up Frontend [React]</H1>

1. Navigate to the frontend directory.

`cd ../frontend`


2. Install the dependencies.

`npm install`

3. Run the React development server.

`npm start`
