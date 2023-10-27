python -m venv venv && source venv/bin/activate

pip install -r requirements.txt

cd MyDjango

python manage.py migrate

python manage.py createsuperuser

python manage.py livereload

python manage.py runserver

