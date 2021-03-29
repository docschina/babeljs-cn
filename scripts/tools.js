(function() {
  let currentItem;
  let currentNav;
  const stepHidden = document.getElementsByClassName("step-hidden");

  function hasClass(ele, cls) {
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
  }
  function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
      ele.className += " " + cls;
    }
  }
  function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
      const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      ele.className = ele.className.replace(reg, " ");
    }
  }

  function reset() {
    if (currentItem) {
      for (let i = 0; i < currentItem.length; i++) {
        currentItem[i].style.display = "none";
      }
    }
    if (currentNav) {
      removeClass(currentNav, "active");
    }
    currentItem = currentNav = null;
    for (let i = 0; i < stepHidden.length; i++) {
      stepHidden[i].removeAttribute("style");
    }
  }

  const buttons = document.querySelectorAll(".tools-group .tools-button");
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.onclick = function() {
      if (currentNav && currentNav === this) {
        return reset();
      } else {
        reset();
      }
      currentNav = this;
      addClass(currentNav, "active");
      const name = currentNav.attributes["data-title"].value;
      location.hash = name;
      currentItem = document.querySelectorAll(
        "[data-title=" + name + "]:not(.tools-button)"
      );
      for (let i = 0; i < currentItem.length; i++) {
        currentItem[i].style.display = "block";
      }
      for (let i = 0; i < stepHidden.length; i++) {
        stepHidden[i].style.display = "block";
      }
    };
  }
})();
