from rest_framework import serializers
from core.models import Customer
from rest_city.serializers import CitySerializer


class CustomerSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)

    class Meta:
        model = Customer
        fields = ["run", "name", "city"]
