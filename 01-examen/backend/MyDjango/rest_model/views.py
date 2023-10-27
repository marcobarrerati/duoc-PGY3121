from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_model.models import Model
from rest_model.serializers import ModelSerializer


@api_view(["GET"])
def model_list(request):
    """
    lista de categorias
    """
    if request.method == "GET":
        model = Model.objects.all()
        serializer = ModelSerializer(model, many=True)
        return Response(serializer.data)


@api_view(["POST"])
def model_add(request):
    """
    registrar modelo
    """
    if request.method == "POST":
        serializer = ModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def model_update(request, id):
    """
    actualizar de modelo
    """
    try:
        model = Model.objects.get(id=id)
    except Model.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = ModelSerializer(model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def model_delete(request, id):
    """
    eliminar modelo
    """
    try:
        model = Model.objects.get(id=id)
    except Model.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "DELETE":
        model.delete()
        return Response({"id": id}, status=status.HTTP_200_OK)


@api_view(["GET"])
def model_get(request, id):
    """
    actualizar de modelo
    """
    try:
        model = Model.objects.get(id=id)
    except Model.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ModelSerializer(model)
        return Response(serializer.data, status=status.HTTP_200_OK)
