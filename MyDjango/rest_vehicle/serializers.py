from rest_framework import serializers
from core.models import Vehicle
from rest_customer.serializers import CustomerSerializer


class VehicleSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = Vehicle
        fields = ["patent", "brand", "model", "category", "customer"]
