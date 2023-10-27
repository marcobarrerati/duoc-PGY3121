from django.db import models

# Create your models here.
class Category(models.Model):
    id = models.IntegerField(primary_key=True, verbose_name="Id de categoría")
    name = models.CharField(max_length=50, verbose_name="Nombre de la categoría")

    def __str__(self):
        return self.name
