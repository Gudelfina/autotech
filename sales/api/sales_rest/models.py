from django.db import models
from django.urls import reverse

# Create your models here.

class VinVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.vin}"

class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.IntegerField()

    def get_api_url(self):
        return reverse('api_salesperson', kwargs={"pk": self.id})


class PotentialCustomer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)

    def get_api_url(self):
        return reverse('api_potentialcustomer', kwargs={"pk": self.id})

class SaleRecord(models.Model):
    vin = models.ForeignKey(
        VinVO,
        related_name="vin",
        on_delete=models.CASCADE
        )

    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="salesperson",
        on_delete=models.CASCADE
        )

    potential_customer = models.ForeignKey(
        PotentialCustomer,
        related_name="potential_customer",
        on_delete=models.CASCADE
        )

    sale_price = models.DecimalField(max_digits=10, decimal_places=2)

    def get_api_url(self):
        return reverse('api_salerecord', kwargs={"pk": self.id})
