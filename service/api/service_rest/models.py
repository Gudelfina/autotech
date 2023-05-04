from django.db import models
from django.urls import reverse
# Create your models here.


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    employee_name = models.CharField(max_length=200)
    employee_id = models.PositiveIntegerField()

    def __str__(self):
        return self.employee_name

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"id": self.id})


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    owner_name = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField(max_length=300)
    completed = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE
    )
