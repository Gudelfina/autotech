from django.urls import path

from .views import api_sales_person, api_customer, api_sale_record_list, api_automobile_vo, api_sale_record_list_delete, api_customer_delete, api_sales_person_detail, api_sale_record_detail

urlpatterns = [
    path(
    'sales-person/',
    api_sales_person,
    name='api_sales_person'),

    path(
    'sales-person/',
    api_sales_person_detail,
    name='api_sales_person_detail'
    ),

    path(
    'sale-record/',
    api_sale_record_list,
    name='api_sale_record_list'),

    path(
    'sale-record/<int:pk>/',
    api_sale_record_detail,
    name='api_sale_record_detail'
    ),

    path(
    'sale-record/<int:pk>/',
    api_sale_record_list_delete,
    name='api_sale_record_delete'),

    path(
    'customer/',
    api_customer,
    name='api_customer'),

    path(
    'automobile-vo/',
    api_automobile_vo,
    name='api_automobile_vo'),

    path(
    'customer/<int:pk>/',
    api_customer_delete,
    name='api_customer_delete'),
]
