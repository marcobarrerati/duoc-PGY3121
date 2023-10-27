from django.urls import path
from .views import home, form_vehicle, form_mod_vehicle, form_del_vehicle

urlpatterns = [
    path("", home, name="home"),
    path("home", home, name="home"),
    path("form-vehiculo", form_vehicle, name="form_vehicle"),
    path("form-mod-vehiculo/<id>", form_mod_vehicle, name="form_mod_vehicle"),
    path("form-del-vehiculo/<id>", form_del_vehicle, name="form_del_vehicle"),
]
