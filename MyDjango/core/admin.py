from django.contrib import admin
from .models import Category, Vehicle, Customer, City

# Register your models here.
admin.site.register(Category)
admin.site.register(Vehicle)
admin.site.register(Customer)
admin.site.register(City)
