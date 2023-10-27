# django

## init
```
python -m venv venv && source venv/bin/activate && python -m pip install --upgrade pip && pip install -r requirements.txt && pip install django-livereload-server && pip install black && pip install djangorestframework && cd MyDjango/ &&  python manage.py makemigrations
```
## up
first terminal
```
python manage.py livereload
```
second terminal
```
python manage.py runserver
```