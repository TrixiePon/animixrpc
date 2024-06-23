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

// Register Presence
getBrowserRuntime().sendMessage(extensionId, {mode: 'passive'}, function(response) {
  console.log('Presence registred', response);
});

// Wait for presence Requests
getBrowserRuntime().onMessage.addListener(function(info, sender, sendResponse) {
  sendResponse(getPresence(info));
});

function getAction(location) {
  if (location.includes('/category/103/')) {
    return document.getElementsByClassName('button--link js-inlineModTrigger button').length > 0 ? "Просматривает новинки весны" : "Просматривает новинки";
  }
  else if (location.includes('/category/3/')) {
    return "Просматривает выбор редакции";
  }
   else if (location.includes('/collection/')) {
    return "Просматривает коллекцию";
  }
  else if (location.includes('/category/102')) {
    return "Ищет романтику на вечер";
  }
  else if (location.includes('/category/1')) {
    return "Просматривает классические аниме";
  }
  else if (location.includes('/profile/')) {
    return "Просматривает профиль пользователя";
  }
  else if (location.includes('/reports') || location.includes('/approval-queue') || (location.includes('/warn') && location.includes('/posts/'))) {
    return "Выполняет модераторские обязанности";
  }
  else if (location.startsWith("*://animix.lol/#") {
    return "Находится на главной странице";
  }
  else if (location.includes("/profile/trixiepon"))
    return "Просматривает профиль создателя расширения";
  else {
    return "Просматривает страницу";
  }
}


var time = Date.now();
function getPresence(info){
  function getMS(string) {
    const a = string.split(":")
    const seconds = string.split(":").length - 1 > 1  ? +a[0] * 3600 + +a[1] * 60 + +a[2] : +a[0] * 60 + +a[1]
    return seconds * 1000;
  }
  try {
    var data = document.title;
    data = data.indexOf(" | ") >= 0 ? data.substring(0, data.indexOf(" | Игровой форум YouGame.Biz")) : data;
    var location = document.location.href;
    var element = document.getElementsByClassName("p-navgroup-linkText")[0].textContent;
    var alerts = document.getElementsByClassName("p-nav-opposite")[0].getElementsByClassName("p-navgroup-link p-navgroup-link--iconic p-navgroup-link--alerts js-badge--alerts badgeContainer badgeContainer")[0].getAttribute("data-badge");
    var msgs = document.getElementsByClassName("p-nav-opposite")[0].getElementsByClassName("p-navgroup-link p-navgroup-link--iconic p-navgroup-link--conversations js-badge--conversations badgeContainer badgeContainer")[0].getAttribute("data-badge");
    if (alerts != "0" || msgs != "0") {
      data = data.substr((alerts != "0" ? alerts.length : 0) + (msgs != "0" ? msgs.length : 0) + 3);
    }
    return {
      clientId: "1254445634522452031",
      presence: {
        details: data != "Animix.lol" ? getAction(location) : "",
        state: getState(data, location),
        startTimestamp: time,
        largeImageText: element != "Войти" ? element + (alerts != "0" || msgs != "0" ? " (" + String(Number(alerts) + Number(msgs)) + ")" : "") : "",  
        largeImageKey: "ani",
        instance: true,
      }
    };
  }catch(e){
    console.error(e);
    return {};
  }
}