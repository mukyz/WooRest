var WooRest = (function() {
	var username = PropertiesService.getScriptProperties().getProperty("REST_username");
	var password = PropertiesService.getScriptProperties().getProperty("REST_password");
	var baseUrl = PropertiesService.getScriptProperties().getProperty("REST_baseUrl");
	var headers = {
		"Authorization" : "Basic " + Utilities.base64Encode(username + ':' + password)    
	};	
	var per_page = 50;
  
	function rest(method, endpoint, postData){
		var options = {
          'method' : method,
          'contentType' : "application/json",
          'validateHttpsCertificates' : false,
          'headers' : headers
		}; 
    
		if(method == "post" || method == "put"){      
			var payloadData = JSON.stringify(postData);
			options.payload = payloadData;
		}
      
		var url = baseUrl + endpoint;
      
		if(method == 'get'){
			(url.indexOf('?') == -1)? url += '?':url += '&';
			url += 'per_page='+per_page;
		}
		try{
			data = [];
			do{
				var response = UrlFetchApp.fetch(url, options);
				url = "";
			
				var responseData = JSON.parse(response.getContentText());
				
				if(method == 'post' || method == 'put' || method == 'delete'){
					return responseData;
				}
				
				data = data.concat(responseData);
			
				var Link = response.getHeaders().Link;
				if(Link !=""){
					var links = Link.split(',');
					for(var i = 0; i < links.length; i++){
						var section = links[i].split(";");
						if(section.length == 2){
							if(section[1].trim() == 'rel="next"'){
                              					var nextLink = section[0].trim();
								url = nextLink.substring(1, nextLink.length-1);
							}
						}
					}
				}
			}while(url!="");
			
			return data;
		}catch(e){
			Logger.log("ERROR: " + e);
		}  
		return null;
	}

  return { 
    get: function (endpoint) {           
      return rest('get', endpoint);    
    },    
    post: function(endpoint, data){     
      return rest('post',endpoint, data);
    }, 
    put: function(endpoint, data){
      return rest('put', endpoint, data);
    }, 
    'delete': function(endpoint){
      return rest('delete', endpoint);
    }
  };
})();
