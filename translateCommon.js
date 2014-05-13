#import 'key.js'

function translate(toTranslate) {

  var encodedText = encodeURIComponent(toTranslate.text);

  var base = 'https://www.googleapis.com/language/translate/v2?';

  var theUrl = [NSURL URLWithString:base + key + "&source=" + toTranslate.source + "&target=" + toTranslate.target + "&q=" + encodedText];

  var theRequest = NSMutableURLRequest.requestWithURL_cachePolicy_timeoutInterval(theUrl, NSURLRequestReloadIgnoringLocalCacheData, 60);
  theRequest.setHTTPMethod_("GET");

  var theResponse = null, theResponseData = [NSURLConnection sendSynchronousRequest:theRequest returningResponse:nil error:nil];

  if (theResponseData!=nil) {

    theText = [[NSString alloc] initWithData:theResponseData encoding:NSUTF8StringEncoding];

    var parsed = JSON.parse(theText);
    translation = parsed.data.translations[0].translatedText;
  }

  return translation;
}