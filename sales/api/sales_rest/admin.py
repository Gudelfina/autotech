from django.contrib import admin
from .models import SalesPerson, SaleRecord

# Register your models here.

@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    list_display = ["name", "employee_number"]

@admin.register(SaleRecord)
class SaleRecordAdmin(admin.ModelAdmin):
    list_display = ["automobile", "sales_person", "customer", "sale_price"]
