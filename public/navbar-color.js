function change_color(color) {
  let navbar;
  let footer;
  let root;
  root = document.querySelector(':root');
  navbar = document.getElementById("root");
  if (navbar) {
    navbar.style.backgroundColor = color;
  }
  let body = document.getElementsByClassName("body");
  if (body[0]) {
    body[0].style.backgroundColor = color;
  }
  footer = document.getElementById("footer-main");
  if (footer) {
    footer.style.backgroundColor = color;
  }
  root.style.setProperty('--green', color);
  root.style.setProperty('--green-dark', color);
}

function check_nav() {
  if (window.location.href.includes("First%20Impressions")) {
    change_color("#B7F6FF");
  } else if (window.location.href.includes("Catch%20a%20Liar")){
    change_color("#FFB7B7");
  } else {
    change_color("#e4ffb7");
  }
}

window.onhashchange = function () {
  check_nav();
};

function locationHashChanged(e) {
  console.log(window.location.hash);
  console.log(e.oldURL, e.newURL);
  if (window.location.hash === "#pageX") {
    check_nav();
  }
}

window.onhashchange = locationHashChanged;

window.onload = function () {
  check_nav();
};

(function () {
  var pushState = window.history.pushState;
  var replaceState = window.history.replaceState;

  window.history.pushState = function () {
    pushState.apply(window.history, arguments);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
  };

  window.history.replaceState = function () {
    replaceState.apply(window.history, arguments);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationchange"));
  };

  window.addEventListener("popstate", function () {
    window.dispatchEvent(new Event("locationchange"));
  });
})();

// Usage example:

window.addEventListener("locationchange", function () {
  check_nav();
});
