function getBrowser() {
    if ( typeof browser === "undefined"  ) {
        return chrome;
    } else {
        return browser;
    }
}
 
function getBrowserRuntime() {
    if ( typeof browser === "undefined"  ) {
        return chrome.extension;
    } else {
        return browser.runtime;
    }   
}

getBrowserRuntime().onMessageExternal.addListener(function(request, sender, sendResponse) {
  if(request.action == "presence") {
    getBrowser().tabs.sendMessage(request.tab, request.info, function(response){
      sendResponse(response);
    });
    return true;
  }
});
