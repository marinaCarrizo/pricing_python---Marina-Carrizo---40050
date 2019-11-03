# Micorservicio de Pricing
El servicio de pricing permite al usuario autenticado consultar precios y descuentos, para poder modificar un precio/descuento dicho usuario necesita ser "admin" para poder hacerlo.

## Objetivos
Este microservicio tiene como objetivo permitir la administración de los precios de los distintos artículos del negocio, tanto precios o descuentos actuales o futuros, manejando fecha de validez de cada precio/descuento.

## Microservicios utilizados
Auth
Catalog
## Recursos del microservicio
Precios
Descuentos

## Servicios ofrecidos
Agregar un precio o descuento
Consultar el/los precios de uno o varios artículos
Modificar un precio/descuento

## Glosario
Precio : Valor del costo de un artículo, se representa con un double y tiene fecha a partir del cual es válido.

Descuento : Valor de promoción que tiene un artículo, al igual que el precio, posee fecha a partir del cual es válido.



# Precios
## Crear Precio
Ruta que permite crear uno o varios precios nuevos. 


URL:
/v1/pricing/:article_id

Method:
POST

Request header:
Authorization=bearer {token}

Request body:

    [{
        price: double,
        fechaDesde: Date
    }]

Response body:

    [{
        id: String
        article_id: String,
        fechaDesde:Date,
        price:double,
        updated: Date
        created: Date
        enabled: boolean


        
    }]

Validaciones: 
Usuario no autorizado
err: InvalidAuth
error: Unauthorized
error: Insufficient access level

## Buscar Precio
Ruta que permite obtener un precio a partir del id del artículo deseado. 
Nota, se devuelve por defecto el precio vigente a la fecha (fechaDesde).

URL:
/v1/pricing/search/:article_id

Method:
GET

Parámetros:
- article_id: id del artículo deseado

Response Body:

    {
        fechaDesde: Date,
        price: double,
        article_id: String
    }

## Buscar Precio por Fecha
Ruta que permite buscar el precio de un artículo para una fecha determinada

URL:
/v1/pricing/:article_id/search/:fecha

Method:
GET

Parámetros:
- article_id: id del artículo deseado
- fecha: fecha del precio

Response Body:

    {
        fechaDesde: Date,
        price: double,
        article_id: String
    }


## Actualizar Precio
Ruta que permite modificar un precio existente a partir del id del artículo correspondiente.
Nota: sólo se modificará el precio vigente a la fecha

URL:
/v1/pricing/:article_id

Method:
POST

Parámetros:
-article_id: id del articulo relacionado al precio existente a modificar

Request Body:

    {
        article_id: String,
        price: double,
        fechaDesde: Date    
    }

Response Body:

    {
         id: String,
        article_id: String,
        fechaDesde:Date,
        price:double,
        updated: Date,
        created: Date,
        enabled: boolean
    }

# Descuentos
## Crear Descuento
Ruta que permite crear uno y varios descuentos nuevos. Cada descuento puede ser definido por un porcentaje (representado por el decimal correspondiente), o por una cantidad fija de dinero.

URL:
/v1/discount/:article_id

Method:
POST

Request header:
Authorization=bearer {token}

Request body:

    [{
        article_id: String,
        discount_percentage: float,
        discount_amount: double,
        fechaDesde: Date    
    }]

Response body:

    [{
        article_id: String,
        discount_code: String,
        discount_percentage: float,
        discount_amount: double,
        fechaDesde: Date,
       
    }]

Validaciones: 
Usuario no autorizado
err: InvalidAuth
error: Unauthorized
error: Insufficient access level

## Buscar Descuento por artículo
Ruta que permite obtener uno o varios descuentos a partir del id del artículo relacionado

URL:
/v1/discount/search/:article_id

Method:
GET

Parámetros:
- article_id: id del artículo relacionado al descuento deseado

Response Body:

    [{
        id: String
        article_id: String  
        fechaDesde: Date,
        discount_code: String,
        discount_percentage: float,
        discount_amount: double,
       
    }]


## Buscar Descuento por código
Ruta que permite obtener uno o varios descuentos a partir del código de descuento

URL:
/v1/discount/search/:discount_code

Method:
GET

Parámetros:
-discount_code: codigo de descuento

Response Body:

    {
        id: String,
        fechaDesde: Date,
        discount_code: String,
        discount_percentage: float,
        discount_amount: double,
        article_id: String
    }

## Buscar Descuento Fecha
Ruta que permite buscar el descuento de un artículo para una fecha determinada

URL:
/v1/discount/article_id/search?fecha

Method:
GET

Parámetros:
- article_id: id del artículo deseado
- fecha: fecha del descuento

Response Body:

    {
        id: String,
        fechaDesde: Date,
        discount_code: String,
        discount_percentage: float,
        discount_amount: double,
        article_id: String
    }


## Actualizar Descuento
Ruta que permite modificar un descuento existente a partir del correspondiente código

URL:
/v1/discounts/:discount_code

Method:
POST

Parámetros:
-discount_id: id del descuento existente a modificar

Request Body:

    {
        article_id: String,
        discount_code: String,
        discount_percentage: float,
        discount_amount: double,
        fechaDesde: Date,    
    }


Response Body:

    {
        id: String,
        article_id: String,
        discount_code: String,
        discount_percentage: float,
        discount_amount: double,
        fechaDesde: Date, 
        message: "Registro actualizado con éxito"
    }

# Errores
Response status: 

200 OK
HTTP/1.1 200 OK

401 Unauthorized
HTTP/1.1 401 Unauthorized

400 Bad Request
HTTP/1.1 400 Bad Request
{
    "error" : "{Motivo del error}"
}

500 Server Error
HTTP/1.1 500 Server Error
{
    "error" : "{Motivo del error}"
}

# Rabbit
## Rabbit GET
### Logout
Escucha de mensajes logout desde auth. Invalida acciones si el usuario no está logueado.

FANOUT auth/logout

{
   "type": "logout",
   "message": "{tokenId}"
}

### Validación de artículos

Escucha de mensajes article-exist desde catalog. Valida la existencia del artículo artículos

DIRECT catalog/article-exist

{
  "type": "article-exist",
  "exchange" : "{Exchange name to reply}"
  "queue" : "{Queue name to reply}"
  "message" : {
      "referenceId": "{referenceId}",
      "articleId": "{articleId}",
  }
} 

## Rabbit POST
### Cambio de precio - Nuevo Precio
Notifica el cambio del precio de un artículo

FANOUT price/price_change

{
    "type":"change",
    "message":{
        "article": {id of the article},
        "price": {new price for the article},
    }
}
### Cambio de descuento - Nuevo Descuento
Notifica el cambio del descuento de un artículo

FANOUT price/discount_change

{
    "type":"change",
    "message":{
        "article": {id of the article},
        "discount": {new discount for the article},
        "discount_code": {code of the discount}
    }
}
