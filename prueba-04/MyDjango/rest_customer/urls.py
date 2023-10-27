from django.urls import path
from .views import customer_list, customer_add, customer_update, customer_delete, customer_get

urlpatterns = [
    path("", customer_list, name="customer_list"),
    path("list", customer_list, name="customer_list"),
    path("add", customer_add, name="customer_add"),
    path("update/<id>", customer_update, name="customer_update"),
    path("delete/<id>", customer_delete, name="customer_delete"),
    path("get/<id>", customer_get, name="customer_get"),
]
