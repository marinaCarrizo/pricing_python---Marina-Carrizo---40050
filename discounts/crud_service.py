# coding=utf_8

import utils.mongo as db
import utils.errors as error
import bson.objectid as bson
from datetime import datetime
import discounts.discount_schema as schema

import random
import string

from rabbit.rabbit_service import sendNewDiscount



def getDiscount(discountCode):
    """
    Obtiene el descuento de un articulo a traves del código de descuento. \n
    discountCode: string ObjectId\n
    return dict<propiedad, valor> Descuento\n
    """
    """
    @api {get} /v1/discount/search/:discount_code Buscar Descuento por codigo
    @apiName Buscar Descuento por codigo
    @apiGroup Descuentos

    @apiSuccessExample {json} Respuesta
        HTTP/1.1 200 OK
        {
            "_id": "{id del precio}"
            "fechaDesde": {fecha de vigencia},
            "discount_code": {codigo de descuento},
            "discount_percentage": {porcentaje de descuento},
            "discount_amount": {monto de descuento}
            "updated": {fecha ultima actualización}
            "created": {fecha creación}
            "enabled": {activo}
        }

    @apiUse Errors

    """
    
    try:
        print("va a buscar", discountCode)
        result = db.discounts.find_one({"discount_code": discountCode})
        print("result", result)

        if (not result):
            raise error.InvalidArgument("_id", "Document does not exists")
        return result
    except Exception: 
        raise error.InvalidArgument("_id", "Invalid object id")


def getDiscountByArticle(articleId):
    """
    Obtiene el descuento de un articulo. \n
    articleId: string ObjectId\n
    return dict<propiedad, valor> Descuento\n
    """
    """
    @api {get} /v1/discount/search/:article_id Buscar Descuento por articulo
    @apiName Buscar Descuento por articulo
    @apiGroup Descuentos

    @apiSuccessExample {json} Respuesta
        HTTP/1.1 200 OK
        {
            "_id": "{id del precio}"
            "fechaDesde": {fecha de vigencia},
            "discount_code": {codigo de descuento},
            "discount_percentage": {porcentaje de descuento},
            "discount_amount": {monto de descuento}
            "updated": {fecha ultima actualización}
            "created": {fecha creación}
            "enabled": {activo}
        }

    @apiUse Errors

    """
    try:
        result = db.discounts.find({"article_id": articleId}).sort(
            "fechaDesde", -1).limit(1)
        
        ultimoDescuento= result[0]
           
        print("resulto mayor: ", ultimoDescuento)
      
        if( not result ):
            raise error.InvalidArgument("_id", "Document does not exists")
       
        return ultimoDescuento
    except Exception:
        raise error.InvalidArgument("_id", "Invalid object id")

def getDiscountByDate(articleId, discountDate):
    """
    Busca descuentos por fecha.\n
    discountDate string fecha a buscar
    """
    """
    @api {get} //v1/discount/article_id/search/:fecha Buscar Precio por fecha
    @apiName Buscar Descuento por fecha
    @apiGroup Descuentos
    @apiDescription Busca Descuentos por fecha de vigencia

    @apiSuccessExample {json} Respuesta
        HTTP/1.1 200 OK
        [
            {
            "_id": "{id del precio}"
            "fechaDesde": {fecha de vigencia},
            "discount_code": {codigo de descuento},
            "discount_percentage": {porcentaje de descuento},
            "discount_amount": {monto de descuento}
            "updated": {fecha ultima actualización}
            "created": {fecha creación}
            "enabled": {activo}
            },
            ...
        ]

    @apiUse Errors
    """

    try:
        print("llego ",discountDate)
        discountDate = datetime.strptime(discountDate, '%d/%m/%y')

        result = db.discounts.find({"article_id": articleId})
        
        resultDiscount = {}
        for discount in result: 
            strDate = discount['fechaDesde']
            objDate = datetime.strptime(strDate, '%Y-%m-%dT%H:%M:%S')
            if(objDate.year == discountDate.year and objDate.month == discountDate.month and objDate.day == discountDate.day):
                
                resultDiscount = discount
                
        if(resultDiscount):
            return resultDiscount
        else:
            return {}

        if (not result):
            raise error.InvalidArgument("_id", "Document does not exists")
        return result
    except Exception: 
        raise error.InvalidArgument("_id", "Invalid object id")





def updateDiscount(discountCode, params):
    """
    Actualiza el descuento de un articulo. \n
    discountCode: string ObjectId\n
    params: dict<propiedad, valor> Descuento\n
    return dict<propiedad, valor> Descuento\n
    """
    """
    @api {post} /v1/discounts/:discount_code Actualizar Descuento
    @apiName Actualizar Descuento
    @apiGroup Descuentos

    @apiUse AuthHeader

    @apiExample {json} Body
        {
            "article_id": {id del articulo},
            "fechaDesde": {fecha de vigencia},
            "discount_code": {codigo de descuento},
            "discount_percentage": {porcentaje de descuento},
            "discount_amount": {monto de descuento}
        }

    @apiSuccessExample {json} Respuesta
        HTTP/1.1 200 OK
        {
            "_id": "{id de precio"}
            "fechaDesde": {fecha de vigencia},
            "discount_code": {codigo de descuento},
            "discount_percentage": {porcentaje de descuento},
            "discount_amount": {monto de descuento},
            "message": {descuento actualizado con éxito}
            "updated": {fecha ultima actualización}
            "created": {fecha creación}
            "enabled": {si esta activo}
        }

    @apiUse Errors

    """
    print('TCL: discountCode', discountCode);
    
    # params["_id"] = discountId

    discounts = schema.newDiscount()

    
    isNew = False
    discounts = getDiscount(discountCode)
    

    
    # Actualizamos los valores validos a actualizar
    

    discounts["updated"] = datetime.utcnow() 
    params ["_id"]= discounts["_id"]  
    discounts.update(params)
    schema.validateSchema(discounts)

    del discounts["_id"]
    r = db.discounts.replace_one(
        {"_id": bson.ObjectId(params["_id"])}, discounts)
    discounts["_id"] = params["_id"]

    
    menssage= {}
    menssage['article'] = discounts["article_id"]
    menssage['discount_code'] = discounts['discount_code']
    sendNewDiscount("discounts", "discounts", "update-discount", menssage)

    
    return discounts
  





def addDiscount(params):
    """
    Agrega un descuento a un articulo.\n
    params: dict<propiedad, valor> Descuento\n
    return dict<propiedad, valor> Descuento
    """
    """
    @api {post} /v1/discount/:article_id Crear Descuento
    @apiName Crear Descuento
    @apiGroup Descuentos

    @apiUse AuthHeader

    @apiExample {json} Body
        {
            "article_id": {id del articulo},
            "fechaDesde": {fecha de vigencia},
            "discount_code": {codigo de descuento},
            "discount_percentage": {porcentaje de descuento},
            "discount_amount": {monto de descuento}
        }

    @apiSuccessExample {json} Respuesta
        HTTP/1.1 200 OK
        {
            "_id": "{id de precio"}
            "fechaDesde": {fecha de vigencia},
            "discount_code": {codigo de descuento},
            "discount_percentage": {porcentaje de descuento},
            "discount_amount": {monto de descuento},
            "message: {Registro creado con éxito}
            "updated": {fecha ultima actualización}
            "created": {fecha creación}
            "enabled": {si esta activo}
        }

    @apiUse Errors

    """
    code = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(6))

    params['discount_code'] = code

    print ("el codigo generado es: "+code)
    isNew = True

    discounts = schema.newDiscount()

    
    discounts.update(params)

    discounts["updated"] = datetime.utcnow()

    schema.validateSchema(discounts)
    
     
   
    discounts["_id"] = db.discounts.insert_one(discounts).inserted_id
    
    menssage = {}
    
    menssage['article'] = discounts["article_id"]
    menssage['discount_code'] = discounts['discount_code']
    sendNewDiscount("discounts", "discounts", "new-discount", menssage)


    return discounts