from django.contrib import admin
from rest_vehicle.models import Vehicle
from rest_category.models import Category
from rest_model.models import Model

# Register your models here.
admin.site.register(Category)
admin.site.register(Vehicle)
admin.site.register(Model)
