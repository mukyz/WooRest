# WooRest
WooCommerce REST API for Google Apps Script 

Uses PropertiesService to fetch username, password and baseURL of your WooCommerce enabled website

Example how to set up properties:
```javascript
var scriptProperties = PropertiesService.getScriptProperties();
  
scriptProperties.setProperty("REST_username", "ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
scriptProperties.setProperty("REST_password", "cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
scriptProperties.setProperty("REST_baseUrl", "https://www.example.com/wp-json/wc/v3/");
```

## Usage

### To send a GET request
```javascript
var response = WooRest.get(endpoint);
```

### To send a PUT request
```javascript
var response = WooRest.put(endpoint, data);
```

### To send a POST request
```javascript
var response = WooRest.post(endpoint, data);
```

### To send a DELETE request
```javascript
var response = WooRest.delete(endpoint);
```

## Params

endpoint example
```javascript
var endpoint = 'products';
var endpoint = 'products/123';
var endpoint = 'products/?type=simple';
```
etc

data is a javaScript Object
data example
``` javascript
data = {
  name: 'Product',
  images: [
    {
      id: 123
    },
    {
      id:456
    }
  ]
};

var response = WooRest.post('products', data);
```
For more information and examples check out [Woocommerce REST API Documentation](https://woocommerce.github.io/woocommerce-rest-api-docs/)

## Return 

Return value is pre parsed javascript Object

For more information and examples check out [Woocommerce REST API Documentation](https://woocommerce.github.io/woocommerce-rest-api-docs/)

## Exceptions

In case any exceptions do occur they are looged to debugging log using Logger class
