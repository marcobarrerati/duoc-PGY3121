from django.db import models

# Create your models here.

# Modelo para categoría


class Category(models.Model):
    id = models.IntegerField(primary_key=True, verbose_name="Id de categoría")
    name = models.CharField(max_length=50, verbose_name="Nombre de la categoría")

    def __str__(self):
        return self.name


class City(models.Model):
    id = models.IntegerField(primary_key=True, verbose_name="Id de la ciudad")
    name = models.CharField(max_length=50, verbose_name="Nombre de la ciudad")

    def __str__(self):
        return "%s" % self.name


class Customer(models.Model):
    run = models.CharField(max_length=9, primary_key=True, verbose_name="RUN")
    name = models.CharField(max_length=20, verbose_name="Nombre")
    city = models.OneToOneField(City, unique=True, on_delete=models.CASCADE, verbose_name="Ciudad")

    def __str__(self):
        return "%s" % self.name


class Vehicle(models.Model):
    patent = models.CharField(max_length=6, primary_key=True, verbose_name="Patente")
    brand = models.CharField(max_length=20, verbose_name="Marca del vehículo")
    model = models.CharField(max_length=20, null=True, blank=True, verbose_name="Modelo del vehículo")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    customer = models.OneToOneField(Customer, unique=True, on_delete=models.CASCADE, verbose_name="Cliente")

    def __srt__(self):
        return "%s" % self.patent  # self.customer.name
