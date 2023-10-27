from django.urls import path
from rest_category.views import category_list, category_add, category_update, category_delete, category_get

urlpatterns = [
    path("", category_list, name="category_list"),
    path("list", category_list, name="category_list"),
    path("add", category_add, name="category_add"),
    path("update/<id>", category_update, name="category_update"),
    path("delete/<id>", category_delete, name="category_delete"),
    path("get/<id>", category_get, name="category_get"),
]
