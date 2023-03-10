# CarCar

Team:

* Lupe Mendez - Services
# NOTE : when creating an appointment, use a VIN that is already exisiting from the inventory microservice automobile section. It will not allow you to create your own unfortunately.


* Noah Granard- Sales

# Start the Project
1. Clone project from gitlab to your local machine (https://gitlab.com/Gudelfina3/project-beta)

2. Navigate to the project-beta directory in your terminal

3. Run Docker Desktop

4. Build the Docker container with the following commands in your terminal:
```
docker volume create beta-data
docker-compose up --build
```
5. Make migrations with the following commands:
```docker exec -it «api-container-name» bash
    python manage.py makemigrations
    python manage.py migrate
```
6. Create a superuser with the following commands:
```docker exec -it «api-container-name» bash
    python manage.py createsuperuser
```
(Follow along with prompts provided in the terminal)

7. Open a browser and navigate to http://localhost:3000 to view the application

n.b. - Any commands which require the container name can be found by running the following command:
```
docker ps

```
Additionally, you can use the Docker Desktop GUI to find and access the container name, or simply access the individual containers via their specific terminal.

# Design Priniciples
![image](https://i.imgur.com/q94m4wp.jpg)


# Ports

1. Inventory Microservice: 8100:8000
2. Service Microservice: 8080:8000
3. Sales Microservice: 8090:8000

# Service microservice

The service microservice allows a user to create a technician and appointment for a customer. It also allows the user to be able to see the full list of appointments and filter through them by inputing an existing VIN. The user will also have the feature to cancel and complete an appointment when it is finished. In order for the service miscroservice to function, I needed to poll data from inventory microservice. For this we used a poller to pull the VIN data in order to incroporate into my own model as a value object. In my service models, I used the Technician and AutomobileVO as foreign keys for the Appointment model. NOTE: Creating an appointment also relies on creating a technician first as well. This allows for the appointment instances to be created with the complete data. In the front-end of the application, there are links to each form and lists, categorized by name: technician and appointment.
# Sales microservice

This automobile sales management system is a comprehensive, full-stack service that allows users to manage and monitor their inventory of automobiles. It offers a variety of features such as adding salespeople and customers, creating sales records, viewing sales history, and displaying sales history for specific salespeople. The app is built on a microservices architecture with an inventory microservice integrated to maintain data consistency. It also enables real-time updates on the inventory and prevents the sale of vehicles that aren't listed or have already been sold.

The front-end of the application uses React, offering forms for adding salespeople and customers via the navbar. The back-end is powered by a RESTful API, using a web framework and a database management system for efficient data storage and retrieval.

The application's back-end is built on the Model-View-Template architecture, using Django as the web framework. The back-end is supported by a relational database management system that stores data in tables and facilitates efficient data manipulation and querying. The models.py file defines the database schema, specifying the fields and relationships between entities. The file includes four models: AutomobileVO, SalesPerson, Customer, and SaleRecord.

The AutomobileVO model defines the attributes of an automobile entity, including its Vehicle Identification Number (VIN) and a Boolean field indicating whether it has been sold or not. The SalesPerson model specifies the attributes of a salesperson entity, such as their name and employee number. The Customer model specifies the attributes of a customer entity, such as their name, address, and phone number. The SaleRecord model defines the relationship between the AutomobileVO, SalesPerson, and Customer models, storing information such as the sale price of the automobile. The SaleRecord model has foreign keys to each of the other three models, indicating the relationships between them. The models.py file also includes a get_api_url method for the SaleRecord model that generates a URL for the API endpoint corresponding to the SaleRecord model.

The inventory of the automobile sales management system is updated in real-time using a script that we will refer to as "poller.py". The script monitors the inventory API for the latest information on automobiles in the inventory every 10 seconds, updating the AutomobileVO model in the Django application's database to ensure consistency between the inventory API and the automobile sales management system. The script is designed to handle any exceptions that may occur during its execution, with any errors printed to stderr for easy debugging.

The front-end and back-end of the automobile sales management system are designed to work together seamlessly, providing a comprehensive solution for managing and monitoring automobile inventory sales.

# Services

The following services (via POST request) should be executed in the following order, as they depend on each other.
1. Manufacturers
2. Vehicle Models
3. Automobile Information

# Manufacturers
The Manufacturers service is responsible for managing the manufacturer information for the automobiles. It provides the ability to add, update, and delete manufacturers. It also provides the ability to view all manufacturers and view a specific manufacturer.

## Manufacturers CRUD Documentation (API)
<details>

# Create a manufacturer
POST request to http://localhost:8100/api/manufacturers/ with the following JSON body:
```
{
    "name": "Toyota",
}
```
Returns
```
{
    "href": "/api/manufacturers/1",
    "id": 1,
    "name": "Toyota",
}
```

### List all manufacturers
GET request to http://localhost:8100/api/manufacturers/ - no body required.

Returns
```
{
	"href": "/api/manufacturers/1/",
	"id": 1,
	"name": "Toyota"
}
```
### Get a specific manufacturer
GET request to http://localhost:8100/api/manufacturers/1/ - no body required. The number at the end of the URL is the ID of the manufacturer you want to retrieve.

Returns
```
{
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Toyota"
}
```
### Update a manufacturer
PUT request to http://localhost:8100/api/manufacturers/1/ with the following JSON body. The number at the end of the URL is the ID of the manufacturer you want to update:

```
{
    "name": "Ford"
}
```

Returns
```
{
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Ford"
}
```

### Delete a manufacturer
DELETE request to http://localhost:8100/api/manufacturers/1/ - no body required. The number at the end of the URL is the ID of the manufacturer you want to delete.

Returns
```
{
	"id": null,
	"name": "Ford"
}
```
</details>


# Vehicle Models
The Vehicle Models service is responsible for managing the vehicle model information for the automobiles. It provides the ability to add, update, and delete vehicle models. It also provides the ability to view all vehicle models and view a specific vehicle model.

## Vehicle Models CRUD Documentation (API)
<details>

### Create a vehicle model
POST request to http://localhost:8100/api/models/ with the following JSON body:

```
{
    "name": "CHRYSLER 300C SRT-8",
    "picture_url": "https://cdn.drivingline.com/media/2323560/300-srt-10.jpg?quality=70&mode=pad&copymetadata=true&w=1130"
    "manufacturer_id": 1
}
```

Returns
```{
	"href": "/api/models/1/",
	"id": 1,
	"name": "CHRYSLER 300C SRT-8",
	"picture_url": "https://cdn.drivingline.com/media/2323560/300-srt-10.jpg?quality=70&mode=pad&copymetadata=true&w=1130",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Chrysler"
	}
}
```

### List all vehicle models
GET request to http://localhost:8100/api/models/ - no body required.

Returns
```
{
	"models": [
		{
			"href": "/api/models/1/",
			"id": 1,
			"name": "CHRYSLER 300C SRT-8",
			"picture_url": "https://cdn.drivingline.com/media/2323560/300-srt-10.jpg?quality=70&mode=pad&copymetadata=true&w=1130",
			"manufacturer": {
				"href": "/api/manufacturers/1/",
				"id": 1,
				"name": "Chrysler"
			}
		}
	]
}
```

### Get a specific vehicle model
GET request to http://localhost:8100/api/models/1/ - no body required. The number at the end of the URL is the ID of the vehicle model you want to retrieve.

Returns
```
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "CHRYSLER 300C SRT-8",
	"picture_url": "https://cdn.drivingline.com/media/2323560/300-srt-10.jpg?quality=70&mode=pad&copymetadata=true&w=1130",
	"manufacturer": {
		"href": "/api/manufacturers/3/",
		"id": 3,
		"name": "Chrysler"
	}
}
```

### Update a vehicle model
PUT request to http://localhost:8100/api/models/1/ with the following JSON body. The number at the end of the URL is the ID of the vehicle model you want to update:

```
{
    "name": "CHRYSLER 500C SRT-10",
    "picture_url": "https://cdn.drivingline.com/media/2323560/300-srt-10.jpg?quality=70&mode=pad&copymetadata=true&w=1130"
    "manufacturer_id": 1
}
```

Returns
```
{
    "href": "/api/models/1/",
    "id": 1,
    "name": "CHRYSLER 500C SRT-10",
    "picture_url": "https://cdn.drivingline.com/media/2323560/300-srt-10.jpg?quality=70&mode=pad&copymetadata=true&w=1130",
    "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Chrysler"
    }
}
```

### Delete a vehicle model
DELETE request to http://localhost:8100/api/models/1/ - no body required. The number at the end of the URL is the ID of the vehicle model you want to delete.

Returns
```
{
	"id": null,
	"name": "CHRYSLER 500C SRT-10",
	"picture_url": "https://cdn.drivingline.com/media/2323560/300-srt-10.jpg?quality=70&mode=pad&copymetadata=true&w=1130",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Chrysler"
	}
}
```
</details>

# Automobile Models
The Automobile Models service is responsible for managing the automobile information for the automobiles. It provides the ability to add, update, and delete automobiles. It also provides the ability to view all automobiles and view a specific automobile.

## Automobile Models CRUD Documentation (API)
<details>

### Create an Automobile model
POST request to http://localhost:8100/api/automobiles/ with the following JSON body:

```
{
  "color": "yellow",
  "year": 2083,
  "vin": "3C3CC5FB2AN120888",
  "model_id": 1
}
```

Returns
```
{
    "href": "/api/automobiles/3C3CC5FB2AN120888/",
    "id": 1,
    "color": "Yellow",
    "year": 2083,
    "vin": "3C3CC5FB2AN120888",
    "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "CHRYSLER 500C SRT-10",
        "picture_url": "https://cdn.drivingline.com/media/2323560/300-srt-10.jpg?quality=70&mode=pad&copymetadata=true&w=1130",
        "manufacturer": {
            "href": "/api/manufacturers/1/",
            "id": 1,
            "name": "Chrysler"
        }
    }
}
```

## NOTE - All VINs must be unique. If you try to create an automobile with a VIN that already exists, you will get an error. Additionally, the VIN can be up to 17 characters long.

### Get list of Automobiles
GET request to http://localhost:8100/api/automobiles/ - no body required:


Returns
```
{
	"autos": [
		{
			"href": "/api/automobiles/3C3CC5FB2AN120888/",
			"id": 1,
			"color": "Yellow",
			"year": 2083,
			"vin": "3C3CC5FB2AN120888",
			"model": {
				"href": "/api/models/1/",
				"id": 1,
				"name": "CHRYSLER 500C SRT-10",
				"picture_url": "https://cdn.drivingline.com/media/2323560/300-srt-10.jpg?quality=70&mode=pad&copymetadata=true&w=1130",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Chrysler"
				}
			}
		},
    ]
}
```

### Get specific Automobile model
GET request to http://localhost:8100/api/automobiles/3C3CC5FB2AN120888/ - no body required. The string at the end of the URL is the VIN of the automobile you would like to get the details about.

Returns
```
{
	"href": "/api/automobiles/3C3CC5FB2AN120888/",
	"id": 1,
	"color": "Yellow",
	"year": 2083,
	"vin": "3C3CC5FB2AN120888",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "CHRYSLER 500C SRT-10",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Chrysler"
		}
	}
}
```

### Update Automobile model
PUT request to http://localhost:8100/api/automobiles/3C3CC5FB2AN120888/ with the following JSON body. The string at the end of the URL is the automobile's VIN:

```
{
  "color": "Red",
  "year": 2013
}
```

Returns
```
{
	"href": "/api/automobiles/3C3CC5FB2AN120888/",
	"id": 1,
	"color": "Red",
	"year": 2013,
	"vin": "3C3CC5FB2AN120888",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "CHRYSLER 500C SRT-10",
		"picture_url": https://cdn.drivingline.com/media/2323560/300-srt-10.jpg?quality=70&mode=pad&copymetadata=true&w=1130",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Chrysler"
		}
	}
}
```

### Delete a specific Automobile model
DELETE request to http://localhost:8100/api/automobiles/3C3CC5FB2AN120888/ - no body required. The string at the end is the automobile's VIN you would like to delete.

Returns
```
{
	"href": "/api/automobiles/3C3CC5FB2AN120888/",
	"id": null,
	"color": "Red",
	"year": 2013,
	"vin": "3C3CC5FB2AN120888",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "CHRYSLER 500C SRT-10",
		"picture_url": "https://cdn.drivingline.com/media/2323560/300-srt-10.jpg?quality=70&mode=pad&copymetadata=true&w=1130",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Chrysler"
		}
	}
}
```
</details>

# Service

## Service CRUD Documentation (API)
<details>

### Create a Technician
POST request from http://localhost:8080/api/technicians/ with the following JSON body:

```
{
	"employee_name": "Bill",
	"employee_id": "1"
}
```

Returns
```
{
	"href": "/api/technicians/1/",
	"employee_name": "Bill",
	"employee_id": "1"
}
```

### Get Technician list
GET request to http://localhost:8080/api/technicians/ - no JSON body required:

Returns
```
{
    "technicians": [
        {
            "href": "/api/technicians/1/",
            "employee_name": "Bill",
            "employee_id": 1
        },
    ]
}
```

### Get specific Technician
GET request to http://localhost:8080/api/technicians/1/ - the number at the end is the ID of technician. No JSON body required:

Returns
```
{
	"href": "/api/technicians/1/",
	"employee_name": "Bill",
	"employee_id": 1
}
```

### Delete specific Technician
DELETE request to http://localhost:8080/api/technicians/1/ - the number at the end is the ID of technician. No JSON body required:

Returns
```
* first send

{
	"deleted": true
}

 * second send

{
	"deleted": false
}
```
## Appointment CRUD Documentation (API)
### Create Appointment
POST request to http://localhost:8080/api/appointments/ with the JSON body:

```
{
	"owner_name" : "Sam",
	"vin": "3C3CC5FB2AN120888",
	"date": "2023-08-03",
	"time": "13:00",
	"reason": "squeaky tire",
	"technician": 1
}
```

Returns
```
{
	"href": "/api/appointments/1/",
	"owner_name": "Sam",
	"date": "2023-03-08",
	"time": "22:05:59.263104",
	"reason": "squeaky tire",
	"vin": {
		"vin": "3C3CC5FB2AN120888",
		"import_href": "/api/automobiles/3C3CC5FB2AN120888/"
	},
	"technician": {
		"href": "/api/technicians/1/",
		"employee_name": "Bill",
		"employee_id": 1
	}
}
```

### List Appointments
GET request to http://localhost:8080/api/appointments/ - no JSON body required:

Returns
```
{
"appointments": [
    {
    "owner_name": "Sam",
    "date": "2023-03-08",
    "time": "22:05:59.263104",
    "reason": "squeaky tire",
    "id": 4,
    "completed": false,
    "vin": {
        "vin": "3C3CC5FB2AN120888",
        "import_href": "/api/automobiles/3C3CC5FB2AN120888/"
    },
    "technician": {
        "href": "/api/technicians/1/",
        "employee_name": "Bill",
        "employee_id": 1
    }
    }
    ]
}
```
### Get specific Appointment
GET request from http://localhost:8080/api/appointments/1/ - the number at the end is the ID of the appointment. No JSON body required.

Returns
```
{
	"owner_name": "Sam",
    "date": "2023-03-08",
    "time": "22:05:59.263104",
    "reason": "squeaky tire",
    "id": 4,
    "completed": false,
    "vin": {
        "vin": "3C3CC5FB2AN120888",
        "import_href": "/api/automobiles/3C3CC5FB2AN120888/"
    },
    "technician": {
        "href": "/api/technicians/1/",
        "employee_name": "Bill",
        "employee_id": 1
    }
}
```

### Update specific Appointment
PUT request to http://localhost:8080/api/appointments/1/ - the number at the end is the ID of the appointment. The following JSON body is:

```
{
	"completed": true
}
```

Returns
```
{
	"owner_name": "Sam",
    "date": "2023-03-08",
    "time": "22:05:59.263104",
    "reason": "squeaky tire",
    "id": 4,
    "completed": true,
    "vin": {
        "vin": "3C3CC5FB2AN120888",
        "import_href": "/api/automobiles/3C3CC5FB2AN120888/"
    },
    "technician": {
        "href": "/api/technicians/1/",
        "employee_name": "Bill",
        "employee_id": 1
    }
}
```

### Delete a specific Appointment
DELETE request to http://localhost:8080/api/appointments/1/ - the number at the is the ID of the appointment. No JSON body required.

Returns
```
* first send

{
	"deleted": true
}

 * second send

{
	"deleted": false
}
```
</details>

# Sales

## Sales Person CRUD Documentation (API)
<details>

# Create Sales Person
POST request to http://localhost:8090/api/sales-person/ with the following JSON body:

```
{
  "name": "Dan",
  "employee_number": 1
}
```

Returns
```
{
    "name": "Dan",
    "employee_number": 1,
    "id": 1,
}
```

### Get list of Sales Persons
GET request to http://localhost:8090/api/sales-person/ - no body required:

Returns
```
{
	"sales_person": [
		{
			"name": "Dan",
			"employee_number": 1,
			"id": 1
		}
    ]
}
```

## Customer CRUD Documentation (API)

### Create Customer
POST request to http://localhost:8090/api/customer/ with the following JSON body:

```
{
  "name": "John",
  "Address": 123 HackReactor Way",
  "phone_number": "123-456-7890",
}
```

Returns
```
{
    "name": "John",
    "Address": 123 HackReactor Way",
    "phone_number": "123-456-7890",
    "id": 1,
}
```

### Get list of Customers
GET request to http://localhost:8090/api/customer/ - no body required:

Returns
```
{
    "customer": [
        {
            "name": "John",
            "Address": 123 HackReactor Way",
            "phone_number": "123-456-7890",
            "id": 1
        }
    ]
}
```

## Sale Record CRUD Documentation (API)

### Create Sale Record
POST request to http://localhost:8090/api/sale-record/ with the following JSON body:

```
{
 "automobile": "3C3CC5FB2AN120888",
    "sales_person": 1,
    "customer": 1,
    "sale_price": "$10,000"
}
```

Returns
```
{
	"sale_record": {
		"sales_person": {
			"name": "Dan",
			"employee_number": 1,
			"id": 1
		},
		"customer": {
			"name": "CHRYSLER 500C SRT-10",
			"address": "123 HackReactor Way",
			"phone_number": 123-456-7890",
			"id": 1
		},
		"sale_price": "$10,000",
		"id": 1,
		"vin": "3C3CC5FB2AN120888",
		"employee_number": 1
	}
}
```
</details>
