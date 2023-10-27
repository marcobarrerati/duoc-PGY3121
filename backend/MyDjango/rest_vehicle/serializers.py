from rest_framework import serializers
from rest_vehicle.models import Vehicle


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ["patent", "brand", "model", "category"]
