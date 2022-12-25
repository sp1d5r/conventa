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

export function change_color(color) {
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
