from django.urls import path
from .views import vehicle_list, vehicle_add, vehicle_update, vehicle_delete, vehicle_get

urlpatterns = [
    path("", vehicle_list, name="vehicle_list"),
    path("list", vehicle_list, name="vehicle_list"),
    path("add", vehicle_add, name="vehicle_add"),
    path("update/<id>", vehicle_update, name="vehicle_update"),
    path("delete/<id>", vehicle_delete, name="vehicle_delete"),
    path("get/<id>", vehicle_get, name="vehicle_get"),
]
