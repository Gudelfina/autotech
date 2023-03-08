from django.urls import path

from .views import api_sales_person, api_customer, api_sale_record_list

urlpatterns = [
    path('sales-person/', api_sales_person, name='api_sales_person'),
    # path('sales-person/<int:pk>/', api_sales_person_details, name='api_sales_person_details'),
    path('sale-record/', api_sale_record_list, name='api_sale_record_list'),
    path('customer/', api_customer, name='api_customer'),
    # path('customer/<int:pk>/', api_customer_details, name='api_customer_details'),
]
