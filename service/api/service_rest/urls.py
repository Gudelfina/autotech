from django.urls import path

from .views import api_appointment_list, api_technician_list, api_show_techincian, api_show_appointment

urlpatterns = [
    path("technicians/", api_technician_list, name="api_create_technician"),
    path("technicians/<int:id>/", api_show_techincian, name="api_show_technician"),
    path("appointments/", api_appointment_list, name="api_create_appointment"),
    path("appointments/<int:id>/", api_show_appointment, name="api_show_appointment"),

]
