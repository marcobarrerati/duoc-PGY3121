from django.urls import path
from rest_model.views import model_list, model_add, model_update, model_delete, model_get

urlpatterns = [
    path("", model_list, name="model_list"),
    path("list", model_list, name="model_list"),
    path("add", model_add, name="model_add"),
    path("update/<id>", model_update, name="model_update"),
    path("delete/<id>", model_delete, name="model_delete"),
    path("get/<id>", model_get, name="model_get"),
]
