from django.shortcuts import render, redirect
from .models import Vehicle
from .forms import VehicleForm

# Create your views here.
def home(request):
    vehicles = Vehicle.objects.all()
    contexto = {"vehicles": vehicles}
    return render(request, "core/home.html", contexto)


def form_vehicle(request):
    contexto = {"form": VehicleForm()}
    if request.method == "POST":
        formulario = VehicleForm(request.POST)
        if formulario.is_valid():
            formulario.save()
            contexto["message"] = "Guardados correctamente"
            contexto["error"] = False
        else:
            contexto["message"] = formulario.errors
            contexto["error"] = True

    return render(request, "core/form_vehiculo.html", contexto)


def form_mod_vehicle(request, id):
    vehicle = Vehicle.objects.get(patent=id)
    contexto = {"form": VehicleForm(instance=vehicle)}
    if request.method == "POST":
        formulario = VehicleForm(data=request.POST, instance=vehicle)
        if formulario.is_valid():
            formulario.save()
            contexto["message"] = "Actualizado correctamente"
            contexto["error"] = False
        else:
            contexto["message"] = formulario.errors
            contexto["error"] = True
    return render(request, "core/form_mod_vehiculo.html", contexto)


def form_del_vehicle(request, id):
    vehicle = Vehicle.objects.get(patent=id)
    vehicle.delete()
    return redirect(to="home")
