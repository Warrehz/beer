
var auth = {
        consumerKey : "eyg4gO8DoW0MTxS-acg1mQ",
        consumerSecret : "vrd1nqrlH9FhfcGMIQukf9aDgKw",
        accessToken : "eAmVEHEByNF8s6W38OAPOzbNmA-BhYgb",
        accessTokenSecret : "GxcGN8OA-mL-xSI6nBftfWM_Yc0",
        serviceProvider : {
          signatureMethod : "HMAC-SHA1"
        }
};

var terms = 'food';
var near = 'Austin';

var accessor = {
  consumerSecret : auth.consumerSecret,
  tokenSecret : auth.accessTokenSecret
};

parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = {
        'action' : 'http://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
};

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);


var parameterMap = OAuth.getParameterMap(message.parameters);
parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
console.log(parameterMap);

$.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'cache' : true,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'cb',
        'success' : function(data, textStats, XMLHttpRequest) {
          console.log(data);
        }
});
