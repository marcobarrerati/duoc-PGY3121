from django.db import models
from rest_category.models import Category
from rest_model.models import Model

# Create your models here.
class Vehicle(models.Model):
    patent = models.CharField(max_length=6, primary_key=True, verbose_name="Patente")
    brand = models.CharField(max_length=20, verbose_name="Marca del vehículo")
    model = models.ForeignKey(Model, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __srt__(self):
        return "%s" % self.patent  # self.customer.name
