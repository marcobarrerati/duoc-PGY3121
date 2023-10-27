from django.db import models

# Create your models here.

# Modelo para categoría


class Category(models.Model):
    id = models.IntegerField(primary_key=True, verbose_name="Id de categoría")
    name = models.CharField(max_length=50, verbose_name="Nombre dela categoría")

    def __str__(self):
        return self.name


class Vehicle(models.Model):
    patent = models.CharField(max_length=6, primary_key=True, verbose_name="Patente")
    brand = models.CharField(max_length=20, verbose_name="Marca del vehículo")
    model = models.CharField(max_length=20, null=True, blank=True, verbose_name="Modelo del vehículo")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __srt__(self):
        return self.patent
