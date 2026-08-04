function getCookie(name) {
  let cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
      let [cookieName, cookieValue] = cookie.split('=');
      if (cookieName == name) {
          return cookieValue;
      }
  }
  return "null";
}

function setCookie(name, value){
    document.cookie = name + "=" + value + ";expires=Tue, 19 Jan 2038 04:14:07 GMT;path=/";
}

function deleteCookie(name) {
    document.cookie = name + "=null;expires=Tue, 19 Jan 2038 04:14:07 GMT;path=/";
}

window.getCookie = getCookie;
window.setCookie = setCookie;
window.deleteCookie = deleteCookie;

