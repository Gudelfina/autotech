import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()
from sales_rest.models import AutomobileVO

# Import models from sales_rest, here.
# from sales_rest.models import Something


def get_vin():
    url = 'http://inventory-api:8000/api/automobiles/'
    response = requests.get(url)
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            vin=automobile["vin"],
            # import_href=automobile["href"],
        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_vin()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(20)


if __name__ == "__main__":
    poll()
