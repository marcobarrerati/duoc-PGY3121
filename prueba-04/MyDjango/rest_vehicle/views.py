from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from core.models import Vehicle
from .serializers import VehicleSerializer


@csrf_exempt
@api_view(["GET"])
def vehicle_list(request):
    """
    lista de vehículos
    """
    if request.method == "GET":
        vehicle = Vehicle.objects.all()
        serializer = VehicleSerializer(vehicle, many=True)
        return Response(serializer.data)


@csrf_exempt
@api_view(["POST"])
def vehicle_add(request):
    """
    registrar vehículo
    """
    if request.method == "POST":
        serializer = VehicleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["PUT"])
def vehicle_update(request, id):
    """
    actualizar de vehículo
    """
    try:
        vehicle = Vehicle.objects.get(patent=id)
    except Vehicle.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = VehicleSerializer(vehicle, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["DELETE"])
def vehicle_delete(request, id):
    """
    eliminar vehículo
    """
    try:
        vehicle = Vehicle.objects.get(patent=id)
    except Vehicle.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "DELETE":
        vehicle.delete()
        return Response(status=status.HTTP_200_OK)


@csrf_exempt
@api_view(["GET"])
def vehicle_get(request, id):
    """
    actualizar de vehículo
    """
    try:
        vehicle = Vehicle.objects.get(patent=id)
    except Vehicle.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = VehicleSerializer(vehicle)
        return Response(serializer.data, status=status.HTTP_200_OK)
