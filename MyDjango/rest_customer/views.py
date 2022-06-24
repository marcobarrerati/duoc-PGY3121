from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from core.models import Vehicle, Customer
from rest_vehicle.serializers import VehicleSerializer
from .serializers import CustomerSerializer


@csrf_exempt
@api_view(["GET"])
def customer_list(request):
    """
    lista de clientes con vehículos
    """
    if request.method == "GET":
        queryset = Vehicle.objects.filter().select_related()
        serializer = VehicleSerializer(queryset, many=True)
        return Response(serializer.data)


@csrf_exempt
@api_view(["POST"])
def customer_add(request):
    """
    registrar cliente
    """
    if request.method == "POST":
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["PUT"])
def customer_update(request, id):
    """
    actualizar datos de cliente
    """
    try:
        customer = Customer.objects.get(run=id)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["DELETE"])
def customer_delete(request, id):
    """
    eliminar cliente
    """
    try:
        customer = Customer.objects.get(run=id)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "DELETE":
        customer.delete()
        return Response(status=status.HTTP_200_OK)


@csrf_exempt
@api_view(["GET"])
def customer_get(request, id):
    """
    Traer datos de cliente
    """
    try:
        queryset = Customer.objects.get(run=id)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = CustomerSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)
