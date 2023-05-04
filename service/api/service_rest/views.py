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


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["employee_name", "employee_id"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "owner_name",
        "date",
        "time",
        "reason",
        "id",
        "completed",
        "vin",
        "technician"
    ]
    encoders = {
        "technician": TechnicianEncoder()
    }

    def get_extra_data(self, o):
        count = AutomobileVO.objects.filter(vin=o.vin).count()
        return {"vip_treatment": count > 0}



@require_http_methods(["GET", "POST"])
def api_technician_list(request, technician_id=None):
    if request.method == "GET":
        if technician_id is not None:
            technicians = Technician.objects.filter(technician=technician_id)
        else:
            technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "technician not created"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET"])
def api_show_techincian(request, id):
    if request.method == "GET":
        technician = Technician.objects.get(id=id)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
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
            encoder=AppointmentEncoder,
        )
    else:
        # try:
        content = json.loads(request.body)
        print("COOOOOTEN", content)
        vin = content["vin"]
        automobiles = Appointment.objects.filter(vin=vin)
        if automobiles.exists():
            automobile = automobiles.first()
            content["vin"] = automobile
        else:
            technician = Technician.objects.get(employee_id=content["technician"])
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
                )
        # except:
        #     response = JsonResponse(
        #         {"message": "appointment not created"}
        #     )
        #     response.status_code = 400
        #     return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_appointment(request, id):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder(),
            safe=False,
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            if "completed" in content:
                completed = bool(content["completed"])
                content["completed"] = completed
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {"message": "appointment not updated"}
                )
            response.status_code
            return response

        Appointment.objects.filter(id=id).update(**content)
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder(),
            safe=False,
        )
    else:
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
