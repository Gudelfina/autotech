from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    # import_href = models.CharField(max_length=100)
    # color = models.CharField(max_length=100)
    # year = models.IntegerField()
    sold = models.BooleanField(default=False)

    # def __str__(self):
    #     return f"{self.vin}"
    def get_api_url(self):
        return reverse("api_automobile_vo", kwargs={"vin": self.vin})

class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.IntegerField()


    def __str__(self):
        return f"{self.name}"

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"

class SaleRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale_record",
        on_delete=models.CASCADE
        )

    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sale_record",
        on_delete=models.CASCADE
        )

    customer = models.ForeignKey(
        Customer,
        related_name="sale_record",
        on_delete=models.CASCADE
        )

    sale_price = models.CharField(max_length=200)
