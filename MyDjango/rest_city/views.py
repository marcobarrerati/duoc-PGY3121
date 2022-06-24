from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from core.models import City
from .serializers import CitySerializer


@csrf_exempt
@api_view(["GET"])
def city_list(request):
    """
    lista de ciudades
    """
    if request.method == "GET":
        city = City.objects.all()
        serializer = CitySerializer(city, many=True)
        return Response(serializer.data)


@csrf_exempt
@api_view(["POST"])
def city_add(request):
    """
    registrar ciudad
    """
    if request.method == "POST":
        serializer = CitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["PUT"])
def city_update(request, id):
    """
    actualizar datos de ciudad
    """
    try:
        city = City.objects.get(id=id)
    except City.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = CitySerializer(city, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["DELETE"])
def city_delete(request, id):
    """
    eliminar ciudad
    """
    try:
        city = City.objects.get(id=id)
    except City.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "DELETE":
        city.delete()
        return Response(status=status.HTTP_200_OK)


@csrf_exempt
@api_view(["GET"])
def city_get(request, id):
    """
    Traer datos de ciudad
    """
    try:
        city = City.objects.get(id=id)
    except City.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = CitySerializer(city)
        return Response(serializer.data, status=status.HTTP_200_OK)
