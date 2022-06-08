# changelog
## 20220524
### Modelos Django
- En el archivo **/MyDjango/core/models.py** agregamos el código para crear los modelos **Categoría** y **Vehículo**
- En la consola tenemos que ejecutar el comando **python manage.py makemigrations** para configurar los modelos creados.
- Posteriormente ejecutamos el comando **python manage.py migrate** para migrar los modelos a la base de datos

### Panel de administración
- Crear superusuario, en la consola ejecutamos el comando **python manage.py createsuperuser**
- En el archivo **/MyDjango/core/admin.py** registramos los modelos y quedan disponibles desde el administrador **127.0.0.0.1:8000/admin**

### Lista de Vehículos
- Crear vista html para ver lista de vehículos: en el directorio **/templates/** creamos un directorio llamado **vehicle** y dejaremos los hml asociados a las vistas de los vehículos.

## livereload django 

- Recurso https://pypi.org/project/django-livereload-server/
```shell
$ pip install django-livereload-server
```
- en el archivo **settings.py** registramos 'livereload' en la variable INSTALLLED_APPS antes de 'django.contrib.staticfiles'
```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "livereload", # <--- acá
    "django.contrib.staticfiles",
    "core",
]
```
- en el mismo arhivo **settings.py** registramos 'livereload.middleware.LiveReloadScript' en la variable MIDDLEWARE
  
```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "livereload.middleware.LiveReloadScript",  # <--- acá
]
```
- Iniciamos livereload **python manage.py livereload**
- En una segunda terminal levantamos el servidor django **python manage.py runserver**

### MDB

- Incorporamos [material design bootsrap](https://mdbootstrap.com/docs/standard/getting-started/installation/) para UI 



## 20220519
### Primera página home
- En el archivo **/MyDjango/core/urls.py** agregamos el código para acceder a la página desde el navegador web
```python
from django.urls import path
from .views import home

urlpatterns = [
    path("", home, name="home"),
    path("home", home, name="home"),
]
```
- En el archivo **/MyDjango/core/views.py** agregamos la función que encarga de servir la página

```python
def home(request):
    contexto = {"titulo": "Título de la Página"}
    return render(request, "home.html", contexto)
```
- En el directorio **/MyDjango/core/templates/** alojamos la página **home.html**
- En el directorio **/MyDjango/core/static/** creamos los directorio **js**, **css** e **img** para alojar los recursos que usaremos en la página **home.html**
  
## 20220517

- crear ambiente virtual **python3 -m venv venv**
- activar ambiente **source venv/bin/activate**
- desactivar (cuando termines de usar el ambiente) **deactivate**
- instalar django **pip install django**
- actualizar pip **pip install --upgrade pip**
- crear proyecto **django-admin starproject MyDjango** e ingresar en directorio **cd MyDjango**
- crear app **python manage.py startapp core**
- ingresar en archivo **/MyDjango/settings.py** y registrar app **core** en la variable **INSTALLED_APPS =[**
```python
  INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'core' # <---- ak
 ]
```
- instalar formateador de python (opcional) **pip black**
- instalar módulo para gestionar archivo de requerimientos del proyecto **pip install pipreqs**
- para crear archivo requirements.txt usamos el comando **pipreqs --encoding utf-8 "./" --force**
- levantar app **python manage.py runserver**