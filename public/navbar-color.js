const newShade = (hexColor, magnitude) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};

function change_nav(color) {
  let nav;
  nav = document.getElementById("navbar");
  if (nav) {
    nav.style.backgroundColor = color;
  }
}

function change_color(color) {
  let navbar;
  let footer;
  let root;
  change_nav(color);
  root = document.querySelector(":root");
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
  root.style.setProperty("--green", color);
  root.style.setProperty("--light-green", newShade(color, 20));
  root.style.setProperty("--green-dark", newShade(color, -20));
}

function check_nav() {
  if (window.location.href.includes("First%20Impressions")) {
    change_color("#B7F6FF");
  } else if (window.location.href.includes("academy")) {
    change_color("#E3FFEA");
  } else if (window.location.href.includes("Catch%20a%20Liar")) {
    change_color("#FFB7B7");
  } else if (window.location.href.includes("Tracking%20Client%20Emotions")) {
    change_color("#E5B7FF");
  } else if (window.location.href.includes("news-room")) {
    change_color("#FFFFFF");
  } else if (window.location.href.includes("auth")) {
    change_color("#e3ffea");
  } else if (window.location.href.includes("pricing-page")) {
    change_color("#ffffff");
  } else if (window.location.href.includes("about-us")) {
    change_color("#ffffff");
    change_nav("#000000");
  } else if (window.location.href.includes("content-locked")) {
    change_color("#ff98b7");
    change_nav("#ff98b7");
  } else {
    change_color("#ffffff");
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
