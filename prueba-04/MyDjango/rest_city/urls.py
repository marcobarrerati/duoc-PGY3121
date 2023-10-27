from django.urls import path
from .views import city_list, city_add, city_update, city_delete, city_get

urlpatterns = [
    path("", city_list, name="city_list"),
    path("list", city_list, name="city_list"),
    path("add", city_add, name="city_add"),
    path("update/<id>", city_update, name="city_update"),
    path("delete/<id>", city_delete, name="city_delete"),
    path("get/<id>", city_get, name="city_get"),
]
