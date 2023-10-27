# django + rest framework

marc.barrera@duocuc.cl

||||
|--|--|--|
|Admin|admin/|
|Auth|JWT|api/token/[name='token_obtain_pair']|
|Auth|JWT|api/token/api/token/refresh/ [name='token_refresh']|
|Auth|JWT|api/token/verify/ [name='token_verify']|
|Modelos| (CRUD)|api/model/|
|Categorías |(CRUD)|api/category/|
|Vehículos| (CRUD)|api/vehicle/|


```
docker-compose up --build
```
```
docker exec -it xxxxxxxx /bin/bash
```
```
python manage.py migrate
```
```
python manage.py createsuperuser
```

```
localhost:8000/admin/
localhost:8000/api/...
```



