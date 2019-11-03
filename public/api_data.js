define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/main.js",
    "group": "D__pricing_python_public_main_js",
    "groupTitle": "D__pricing_python_public_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/v1/discounts/:discount_code",
    "title": "Actualizar Descuento",
    "name": "Actualizar_Descuento",
    "group": "Descuentos",
    "examples": [
      {
        "title": "Body",
        "content": "{\n    \"article_id\": {id del articulo},\n    \"fechaDesde\": {fecha de vigencia},\n    \"discount_code\": {codigo de descuento},\n    \"discount_percentage\": {porcentaje de descuento},\n    \"discount_amount\": {monto de descuento}\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"{id de precio\"}\n    \"fechaDesde\": {fecha de vigencia},\n    \"discount_code\": {codigo de descuento},\n    \"discount_percentage\": {porcentaje de descuento},\n    \"discount_amount\": {monto de descuento},\n    \"message\": {descuento actualizado con éxito}\n    \"updated\": {fecha ultima actualización}\n    \"created\": {fecha creación}\n    \"enabled\": {si esta activo}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./discounts/crud_service.py",
    "groupTitle": "Descuentos",
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"path\" : \"{Nombre de la propiedad}\",\n    \"message\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/discount/search/:article_id",
    "title": "Buscar Descuento por articulo",
    "name": "Buscar_Descuento_por_articulo",
    "group": "Descuentos",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"{id del precio}\"\n    \"fechaDesde\": {fecha de vigencia},\n    \"discount_code\": {codigo de descuento},\n    \"discount_percentage\": {porcentaje de descuento},\n    \"discount_amount\": {monto de descuento}\n    \"updated\": {fecha ultima actualización}\n    \"created\": {fecha creación}\n    \"enabled\": {activo}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./discounts/crud_service.py",
    "groupTitle": "Descuentos",
    "error": {
      "examples": [
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"path\" : \"{Nombre de la propiedad}\",\n    \"message\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/discount/search/:discount_code",
    "title": "Buscar Descuento por codigo",
    "name": "Buscar_Descuento_por_codigo",
    "group": "Descuentos",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"{id del precio}\"\n    \"fechaDesde\": {fecha de vigencia},\n    \"discount_code\": {codigo de descuento},\n    \"discount_percentage\": {porcentaje de descuento},\n    \"discount_amount\": {monto de descuento}\n    \"updated\": {fecha ultima actualización}\n    \"created\": {fecha creación}\n    \"enabled\": {activo}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./discounts/crud_service.py",
    "groupTitle": "Descuentos",
    "error": {
      "examples": [
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"path\" : \"{Nombre de la propiedad}\",\n    \"message\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "//v1/discount/article_id/search/:fecha",
    "title": "Buscar Precio por fecha",
    "name": "Buscar_Descuento_por_fecha",
    "group": "Descuentos",
    "description": "<p>Busca Descuentos por fecha de vigencia</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n[\n    {\n    \"_id\": \"{id del precio}\"\n    \"fechaDesde\": {fecha de vigencia},\n    \"discount_code\": {codigo de descuento},\n    \"discount_percentage\": {porcentaje de descuento},\n    \"discount_amount\": {monto de descuento}\n    \"updated\": {fecha ultima actualización}\n    \"created\": {fecha creación}\n    \"enabled\": {activo}\n    },\n    ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./discounts/crud_service.py",
    "groupTitle": "Descuentos",
    "error": {
      "examples": [
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"path\" : \"{Nombre de la propiedad}\",\n    \"message\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/discount/:article_id",
    "title": "Crear Descuento",
    "name": "Crear_Descuento",
    "group": "Descuentos",
    "examples": [
      {
        "title": "Body",
        "content": "{\n    \"article_id\": {id del articulo},\n    \"fechaDesde\": {fecha de vigencia},\n    \"discount_code\": {codigo de descuento},\n    \"discount_percentage\": {porcentaje de descuento},\n    \"discount_amount\": {monto de descuento}\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"{id de precio\"}\n    \"fechaDesde\": {fecha de vigencia},\n    \"discount_code\": {codigo de descuento},\n    \"discount_percentage\": {porcentaje de descuento},\n    \"discount_amount\": {monto de descuento},\n    \"message: {Registro creado con éxito}\n    \"updated\": {fecha ultima actualización}\n    \"created\": {fecha creación}\n    \"enabled\": {si esta activo}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./discounts/crud_service.py",
    "groupTitle": "Descuentos",
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"path\" : \"{Nombre de la propiedad}\",\n    \"message\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/pricing/:article_id",
    "title": "Actualizar Precio",
    "name": "Actualizar_Precio",
    "group": "Precios",
    "examples": [
      {
        "title": "Body",
        "content": "{\n    \"article_id\": {id del articulo},\n    \"price\": {precio actual},\n    \"fechaDesde\": {fecha de vigencia}\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"{id de precio\"}\n    \"price\": {precio actual},\n    \"fechaDesde: {fecha de vigencia}\",\n    \"updated\": {fecha ultima actualización}\n    \"created\": {fecha creación}\n    \"enabled\": {si esta activo}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./prices/crud_service.py",
    "groupTitle": "Precios",
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"path\" : \"{Nombre de la propiedad}\",\n    \"message\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/pricing/search/:article_id",
    "title": "Buscar Precio",
    "name": "Buscar_Precio",
    "group": "Precios",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"{id del precio}\"\n    \"price\": {precio actual},\n    \"fechaDesde\": {fecha de vigencia}\n    \"updated\": {fecha ultima actualización}\n    \"created\": {fecha creación}\n    \"enabled\": {activo}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./prices/crud_service.py",
    "groupTitle": "Precios",
    "error": {
      "examples": [
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"path\" : \"{Nombre de la propiedad}\",\n    \"message\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/pricing/:article_id/search/:fecha",
    "title": "Buscar Precio por fecha",
    "name": "Buscar_Precio_por_fecha",
    "group": "Precios",
    "description": "<p>Busca precios por fecha de vigencia</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"{id de articulo}\"\n        \"price\": {precio actual},\n        \"fechaDesde\": {fecha de vigencia}\n        \"updated\": {fecha ultima actualización}\n        \"created\": {fecha creación}\n        \"enabled\": {activo}\n    },\n    ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./prices/crud_service.py",
    "groupTitle": "Precios",
    "error": {
      "examples": [
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"path\" : \"{Nombre de la propiedad}\",\n    \"message\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/pricing/:article_id",
    "title": "Crear Precio",
    "name": "Crear_Precio",
    "group": "Precios",
    "examples": [
      {
        "title": "Body",
        "content": "{\n    \"price\": {precio del articulo},\n    \"fechaDesde\": {fecha de vigencia}\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"{id de articulo}\"\n    \"price\": {precio actual},\n    \"fechaDesde\": {fecha de vigencia},\n    \"updated\": {fecha ultima actualización}\n    \"created\": {fecha creación}\n    \"enabled\": {si esta activo}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./prices/crud_service.py",
    "groupTitle": "Precios",
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"path\" : \"{Nombre de la propiedad}\",\n    \"message\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"error\" : \"{Motivo del error}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "direct",
    "url": "catalog/article-exist",
    "title": "Validación de Articulos",
    "group": "RabbitMQ_GET",
    "description": "<p>Escucha de mensajes article-exist desde cart. Valida articulos</p>",
    "examples": [
      {
        "title": "Mensaje",
        "content": "{\n  \"type\": \"article-exist\",\n  \"exchange\" : \"{Exchange name to reply}\"\n  \"queue\" : \"{Queue name to reply}\"\n  \"message\" : {\n      \"referenceId\": \"{referenceId}\",\n      \"articleId\": \"{articleId}\",\n  }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./rabbit/rabbit_service.py",
    "groupTitle": "RabbitMQ_GET",
    "name": "DirectCatalogArticleExist"
  },
  {
    "type": "direct",
    "url": "catalog/article-exist",
    "title": "Validación de Articulos",
    "group": "RabbitMQ_GET",
    "description": "<p>Escucha de mensajes article-data desde cart. Valida articulos</p>",
    "examples": [
      {
        "title": "Mensaje",
        "content": "{\n  \"type\": \"article-exist\",\n  \"exchange\" : \"{Exchange name to reply}\"\n  \"queue\" : \"{Queue name to reply}\"\n  \"message\" : {\n      \"referenceId\": \"{referenceId}\",\n      \"articleId\": \"{articleId}\",\n  }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./rabbit/rabbit_service.py",
    "groupTitle": "RabbitMQ_GET",
    "name": "DirectCatalogArticleExist"
  },
  {
    "type": "fanout",
    "url": "auth/logout",
    "title": "Logout",
    "group": "RabbitMQ_GET",
    "description": "<p>Escucha de mensajes logout desde auth. Invalida sesiones en cache.</p>",
    "examples": [
      {
        "title": "Mensaje",
        "content": "{\n  \"type\": \"article-exist\",\n  \"message\" : \"tokenId\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./rabbit/rabbit_service.py",
    "groupTitle": "RabbitMQ_GET",
    "name": "FanoutAuthLogout"
  },
  {
    "type": "direct",
    "url": "Discounts/",
    "title": "New or Updated Discount",
    "group": "RabbitMQ_POST",
    "description": "<p>Informa un nuevo descuento o algun cambio en uno existente.</p>",
    "examples": [
      {
        "title": "Mensaje",
        "content": "{\n  \"type\": \"new-discount\",\n  \"message\" : \"discount\"\n}",
        "type": "json"
      },
      {
        "title": "Mensaje",
        "content": "{\n  \"type\": \"updated-discount\",\n  \"message\" : \"discount\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./rabbit/rabbit_service.py",
    "groupTitle": "RabbitMQ_POST",
    "name": "DirectDiscounts"
  },
  {
    "type": "direct",
    "url": "Prices/",
    "title": "New or Updated Price",
    "group": "RabbitMQ_POST",
    "description": "<p>Informa un nuevo precio o algun cambio en uno existente.</p>",
    "examples": [
      {
        "title": "Mensaje",
        "content": "{\n  \"type\": \"new-price\",\n  \"message\" : \"price\"\n}",
        "type": "json"
      },
      {
        "title": "Mensaje",
        "content": "{\n  \"type\": \"updated-price\",\n  \"message\" : \"price\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./rabbit/rabbit_service.py",
    "groupTitle": "RabbitMQ_POST",
    "name": "DirectPrices"
  }
] });
