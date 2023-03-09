from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from .models import Appointment, Technician, AutomobileVO
# Create your views here.


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["employee_name", "employee_id"]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["employee_name", "employee_id"]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "owner_name",
        "date",
        "time",
        "reason",
        "id",
        "vin",
        "technician"
    ]
    encoders = {
        "vin": AutomobileVODetailEncoder(),
        "technician": TechnicianDetailEncoder()
    }


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "owner_name",
        "date",
        "time",
        "reason",
        "vin",
        "technician"
    ]
    encoders = {
        "vin": AutomobileVODetailEncoder(),
        "technician": TechnicianDetailEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_technician_list(request, technician_id=None):
    if request.method == "GET":
        if technician_id is not None:
            technicians = Technician.objects.filter(technician=technician_id)
        else:
            technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else: #post
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "technician not created"}
            )
            response.status_code
            return response


@require_http_methods(["DELETE", "GET"])
def api_show_techincian(request, id):
    if request.method == "GET":
        technician = Technician.objects.get(id=id)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})



@require_http_methods(["GET", "POST"])
def api_appointment_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else: #post
        try:
            content = json.loads(request.body)
            vin = AutomobileVO.objects.get(vin=content["vin"])
            content["vin"] = vin

            technician = Technician.objects.get(employee_id=content["technician"])
            content["technician"] = technician

            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "appointment not created"}
            )
            response.status_code
            return response


@require_http_methods(["DELETE", "GET"])
def api_show_appointment(request, id):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
