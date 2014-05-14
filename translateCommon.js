var defaults = [NSUserDefaults standardUserDefaults]
var key = 'key=' + [defaults objectForKey:"TRANSLATE_API_KEY"];

// Thanks to Jim Rutherford for pointing me in the right direction on this
// https://github.com/jimrutherford/Random-User/blob/master/Random%20User/randomUserCommon.js

function translate(toTranslate) {

  var encodedText = encodeURIComponent(toTranslate.text);

  var base = 'https://www.googleapis.com/language/translate/v2?';

  var urlString = base + key + "&source=" + toTranslate.source + "&target=" + toTranslate.target + "&q=" + encodedText;

  var theUrl = [NSURL URLWithString:urlString];

  var theRequest = NSMutableURLRequest.requestWithURL_cachePolicy_timeoutInterval(theUrl, NSURLRequestReloadIgnoringLocalCacheData, 60);
  theRequest.setHTTPMethod_("GET");

  var theResponse = null, theResponseData = [NSURLConnection sendSynchronousRequest:theRequest returningResponse:nil error:nil];

  if (theResponseData!=nil) {

    theText = [[NSString alloc] initWithData:theResponseData encoding:NSUTF8StringEncoding];

    var parsed = JSON.parse(theText);
    if (parsed.error) {
      var app = [NSApplication sharedApplication];
      [app displayDialog:"Please try re-entering it using the dropdown menu" withTitle:"Invalid key"];
      return;
    } else {
      translation = parsed.data.translations[0].translatedText;
    }
  }

  return translation;
}