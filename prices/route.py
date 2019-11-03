import utils.json_serializer as json
import utils.errors as errors
import utils.security as security
import flask
import prices.crud_service as crud
import prices.rest_validations as restValidator
import datetime


def init(app):
    """
    Iniciamos las rutas para los precios
    """
    @app.route('/v1/pricing/<articleId>', methods=['POST'])
    def addPrice(articleId):
        print("Petición para agregar precio")
        try:
            security.validateAdminRole(flask.request.headers.get("Authorization"))
           

            token = flask.request.headers.get("Authorization")
            
            security.validateArticle(articleId, token)
            
            params = json.body_to_dic(flask.request.data)
            

            # print(params)

            responses = []
           
            
            

                # print("price", price)
            pri = restValidator.validateAddPriceParams(params)
            # print("pri",pri)
            result = crud.addPrice(pri)
            
            responses.append(result.copy())
            
            print(responses)
            # return json.dic_to_json(result)
            return json.dic_to_json(result)
        except Exception as err:
            return errors.handleError(err)

    @app.route('/v1/pricing/<articleId>', methods=['POST'])
    def updatePrice(articleId):
        try:
            security.validateAdminRole(flask.request.headers.get("Authorization"))

            print('entro')
            token = flask.request.headers.get("Authorization")
            
            security.validateArticle(articleId, token)


            # print("now "+ datetime.datetime.utcnow())

            print("articleID "+articleId)

            params = json.body_to_dic(flask.request.data)

            params = restValidator.validateEditPriceParams(articleId, params)

            result = crud.updatePrice(articleId, params)

            return json.dic_to_json(result)
        except Exception as err:
            print("error")
            return errors.handleError(err)

    @app.route('/v1/pricing/search/<articleId>', methods=['GET'])
    def getPrice(articleId):
        print("ejecuta")
        try:
            
            
            return json.dic_to_json(crud.getPrice(articleId))
        except Exception as err:
            return errors.handleError(err)

    @app.route('/v1/pricing/<articleId>/search', methods=['GET'])
    def getPriceByDate(articleId):
        print("ejecuta")
        try:
            priceDate = flask.request.args.get('fecha')
            
            return json.dic_to_json(crud.getPriceByDate(articleId, priceDate))
            # return "funciono"

        except Exception as err:
            return errors.handleError(err)
