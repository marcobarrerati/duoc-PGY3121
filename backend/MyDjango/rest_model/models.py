from django.db import models


class Model(models.Model):
    id = models.IntegerField(primary_key=True, verbose_name="Id del Modelo")
    name = models.CharField(max_length=50, verbose_name="Nombre del modelo")

    def __str__(self):
        return self.name
