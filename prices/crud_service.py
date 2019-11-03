# coding=utf_8

import utils.mongo as db
import utils.errors as error
import bson.objectid as bson
from datetime import datetime
import prices.price_schema as schema

from rabbit.rabbit_service import sendNewPrice
# from rabbit.rabbit_service import sendChangePrice


def getPrice(articleId):
    """
    Obtiene el precio de un articulo. \n
    articleId: string ObjectId\n
    return dict<propiedad, valor> Precio\n
    """
    """
    @api {get} /v1/pricing/search/:article_id Buscar Precio
    @apiName Buscar Precio 
    @apiGroup Precios

    @apiSuccessExample {json} Respuesta
        HTTP/1.1 200 OK
        {
            "_id": "{id del precio}"
            "price": {precio actual},
            "fechaDesde": {fecha de vigencia}
            "updated": {fecha ultima actualización}
            "created": {fecha creación}
            "enabled": {activo}
        }

    @apiUse Errors

    """

    try:
        
        # TODO: verificar también la vigencia de los precios 
        result = db.prices.find({"article_id": articleId}).sort(
            "fechaDesde", -1).limit(1)
        
        ultimoPrecio = result[0]

        print("resulto mayor: ", ultimoPrecio)

        if (not result):
            raise error.InvalidArgument("_id", "Document does not exists")
        
        return ultimoPrecio
    except Exception:
        raise error.InvalidArgument("_id", "Invalid object id")


def getPriceByDate(articleId, priceDate):
    """
    Busca precios por fecha.\n
    priceDate string fecha a buscar
    """
    """
    @api {get} /v1/pricing/:article_id/search/:fecha Buscar Precio por fecha
    @apiName Buscar Precio por fecha
    @apiGroup Precios
    @apiDescription Busca precios por fecha de vigencia

    @apiSuccessExample {json} Respuesta
        HTTP/1.1 200 OK
        [
            {
                "_id": "{id de articulo}"
                "price": {precio actual},
                "fechaDesde": {fecha de vigencia}
                "updated": {fecha ultima actualización}
                "created": {fecha creación}
                "enabled": {activo}
            },
            ...
        ]

    @apiUse Errors
    """

    try:
        print("llego ",priceDate)
        priceDate = datetime.strptime(priceDate, '%d/%m/%y')

        result = db.prices.find({"article_id": articleId})
        resultPrice = {}
        
        for price in result: 
            
            strDate = price['fechaDesde']
            objDate = datetime.strptime(strDate, '%Y-%m-%dT%H:%M:%S')
            
            if(objDate.year == priceDate.year and objDate.month == priceDate.month and objDate.day == priceDate.day):
                # print("encontró", price)
                resultPrice = price
                
        
       
        if(resultPrice):
            return resultPrice
        else:
            return {}

        if (not result):
            raise error.InvalidArgument("_id", "Document does not exists")
        return result
    except Exception: 
        raise error.InvalidArgument("_id", "Invalid object id")



def updatePrice(articleId, params):

    """
    Actualiza el precio de un articulo. \n
    articleId: string ObjectId\n
    params: dict<propiedad, valor> Precio\n
    return dict<propiedad, valor> Precio\n
    """
    """
    @api {post} /v1/pricing/:article_id Actualizar Precio
    @apiName Actualizar Precio
    @apiGroup Precios

    @apiUse AuthHeader

    @apiExample {json} Body
        {
            "article_id": {id del articulo},
            "price": {precio actual},
            "fechaDesde": {fecha de vigencia}
        }

    @apiSuccessExample {json} Respuesta
        HTTP/1.1 200 OK
        {
            "_id": "{id de precio"}
            "price": {precio actual},
            "fechaDesde: {fecha de vigencia}",
            "updated": {fecha ultima actualización}
            "created": {fecha creación}
            "enabled": {si esta activo}
        }

    @apiUse Errors

    """
    
    prices = schema.newPrice()

    # print('TCL: params["article_id"]', params["article_id"])
    isNew = False
    prices = getPrice(params["article_id"])
    print('TCL: prices', prices);

    # Actualizamos los valores validos a actualizar
    prices.update(params)
    

    prices["updated"] = datetime.utcnow()
    # params["_id"] = prices["_id"]
    print("prices Up: ",prices)

    schema.validateSchema(prices)

    params["_id"] = prices["_id"]
    del prices["_id"]
    r = db.prices.replace_one(
        {"_id": bson.ObjectId(params["_id"])}, prices)
    prices["_id"] = params["_id"]


    menssage = {}
    menssage['article'] = prices["article_id"]
    menssage['price'] = prices['price']
    sendNewPrice("prices", "prices", "update-price", menssage)
    return prices





def addPrice(params):
    """
    Agrega un precio a un articulo.\n
    params: dict<propiedad, valor> Precio\n
    return dict<propiedad, valor> Precio
    """
    """
    @api {post} /v1/pricing/:article_id Crear Precio
    @apiName Crear Precio
    @apiGroup Precios

    @apiUse AuthHeader

    @apiExample {json} Body
        {
            "price": {precio del articulo},
            "fechaDesde": {fecha de vigencia}
        }

    @apiSuccessExample {json} Respuesta
        HTTP/1.1 200 OK
        {
            "_id": "{id de articulo}"
            "price": {precio actual},
            "fechaDesde": {fecha de vigencia},
            "updated": {fecha ultima actualización}
            "created": {fecha creación}
            "enabled": {si esta activo}
        }

    @apiUse Errors

    """
    print('params', params)
    isNew = True
    prices = schema.newPrice()
    prices.update(params)

    prices["updated"] = datetime.utcnow()

    schema.validateSchema(prices)
    
    menssage = {}
    menssage['article'] = prices["article_id"]
    menssage['price'] = prices['price']
    prices["_id"] = db.prices.insert_one(prices).inserted_id
    sendNewPrice("prices", "prices", "new-price", menssage)
    return prices
