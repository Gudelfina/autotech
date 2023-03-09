from django.db import models
from django.urls import reverse
# Create your models here.


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)


class Technician(models.Model):
    employee_name = models.CharField(max_length=200)
    employee_id = models.PositiveIntegerField()

    def __str__(self):
        return self.employee_name

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"id": self.id})


class Appointment(models.Model):
    owner_name = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField(max_length=300)

    vin = models.ForeignKey(
        AutomobileVO,
        related_name="appointments",
        on_delete=models.CASCADE
    )

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE
    )


    def __str__(self):
        return self.owner_name

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"id": self.id})
