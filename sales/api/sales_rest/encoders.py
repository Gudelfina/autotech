from common.json import ModelEncoder
from .models import VinVO, SalesPerson, PotentialCustomer, SaleRecord

class VinVOEncoder(ModelEncoder):
    model = VinVO
    properties = [
        "vin",
        "import_href",
    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
    ]


class PotentialCustomerEncoder(ModelEncoder):
    model = PotentialCustomer
    properties = [
        "name",
        "address",
        "phone_number",
    ]

class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "automobile",
        "salesperson",
        "potential_customer",
        "sale_price",
    ]
    encoders = {
        "vin": VinVOEncoder(),
        "salesperson": SalesPersonEncoder(),
        "potential_customer": PotentialCustomerEncoder(),
    }
