from django.db import models
from django.urls import reverse


# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.vin}"

    # def get_api_url(self):
    #     return reverse('api_automobile', kwargs={"pk": self.vin})

class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.IntegerField()

    # def get_api_url(self):
    #     return reverse('api_salesperson', kwargs={"pk": self.id})
    def __str__(self):
        return f"{self.name}"

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class SaleRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale_record",
        on_delete=models.PROTECT
        )

    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sale_record",
        on_delete=models.PROTECT
        )

    customer = models.ForeignKey(
        Customer,
        related_name="sale_record",
        on_delete=models.PROTECT
        )

    sale_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.sales_person}"
