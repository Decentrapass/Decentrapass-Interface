export const setCookie = (cname, cvalue, exhours) => {
  var d = new Date();
  d.setTime(d.getTime() + exhours * 3600 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const deleteCookie = (cname) => {
  document.cookie = cname + "=;" + "Thu, 01 Jan 1970 00:00:01 GMT;path=/";
};
