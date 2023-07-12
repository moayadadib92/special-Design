let landingPage = document.querySelector(".landing-page");
let colorsLi = Array.from(
  document.querySelectorAll(".settings-container .colors-list li")
);
let randomBackEl = document.querySelectorAll(
  ".option-box .random-backgrounds span"
);
let ourSkills = document.querySelector(".skills");
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".header-area .links a");
let bulletsSpan = document.querySelectorAll(".option-box .bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let settingIcon = document.querySelector(".setting-box .fa-cog");
let settingBox = document.querySelector(".setting-box");

let backgroundOption = true;
let backgroundInterval;
let currentYear = new Date();

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

if (localStorage.getItem("color-option") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );

  colorsLi.forEach((li) => {
    li.classList.remove("active");

    if (li.dataset.color === localStorage.getItem("color-option")) {
      li.classList.add("active");
    }
  });
}

if (localStorage.getItem("background-option") !== null) {
  localStorage.getItem("background-option") === "true"
    ? (backgroundOption = true)
    : (backgroundOption = false);

  randomBackEl.forEach((el) => el.classList.remove("active"));

  localStorage.getItem("background-option") === "true"
    ? document.querySelector(".random-backgrounds .yes").classList.add("active")
    : document.querySelector(".random-backgrounds .no").classList.add("active");
}

if (localStorage.getItem("bullets-option") !== null) {
  bulletsSpan.forEach((span) => span.classList.remove("active"));

  if (localStorage.getItem("bullets-option") === "block") {
    bulletsContainer.style.display = "block";

    document
      .querySelector(".option-box .bullets-option .yes")
      .classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document
      .querySelector(".option-box .bullets-option .no")
      .classList.add("active");
  }
}

colorsLi.forEach((li) => {
  li.onclick = (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  };
});

settingIcon.onclick = () => {
  settingIcon.classList.toggle("fa-spin");

  settingBox.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== settingIcon && e.target !== settingBox) {
    if (settingBox.classList.contains("open")) {
      settingIcon.classList.toggle("fa-spin");

      settingBox.classList.toggle("open");
    }
  }
});

settingBox.onclick = (e) => {
  e.stopPropagation();
};

randomBackEl.forEach((span) => {
  span.onclick = (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      localStorage.setItem("background-option", true);

      randomizeImgs();
    } else {
      backgroundOption = false;

      localStorage.setItem("background-option", false);

      clearInterval(backgroundInterval);
    }
  };
});

randomizeImgs();

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let random = Math.floor(Math.random() * imgsArray.length);

      landingPage.style.backgroundImage = `url(images/${imgsArray[random]})`;
    }, 10000);
  }
}

window.onscroll = () => {
  let skillsOfsetTop = ourSkills.offsetTop;

  let skillsOuterHeigth = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.scrollY;

  if (windowScrollTop > skillsOfsetTop + skillsOuterHeigth - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach((img) => {
  img.onclick = () => {
    let overlay = document.createElement("div");

    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    overlay.appendChild(popupBox);

    let imgHeading = document.createElement("h3");

    if (img.alt !== null) {
      imgHeading.appendChild(document.createTextNode(img.alt));

      popupBox.appendChild(imgHeading);
    }

    let popupImage = document.createElement("img");

    popupImage.src = img.src;

    popupBox.appendChild(popupImage);

    let closeSpan = document.createElement("span");

    closeSpan.appendChild(document.createTextNode("X"));

    closeSpan.className = "close-button";

    popupBox.appendChild(closeSpan);
  };
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    document.querySelector(".popup-overlay").remove();
  }
});

scrollToSection(allBullets);
scrollToSection(allLinks);

document.addEventListener("click", (e) => {
  if (e.target.className === "bullet") {
    allBullets.forEach((bullet) => {
      bullet.classList.remove("active");
    });
    e.target.classList.add("active");
  }
});

bulletsSpan.forEach((span) => {
  span.onclick = (e) => {
    if (e.target.dataset.display === "block") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets-option", "hide");
    }

    handleActive(e);
  };
});

document.querySelector(".reset-button").onclick = () => {
  localStorage.clear();

  window.location.reload();
};

function scrollToSection(elements) {
  elements.forEach((element) => {
    element.onclick = (e) => {
      e.preventDefault();

      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    };
  });
}

function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });

  event.target.classList.add("active");
}

let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleBtn.onclick = (e) => {
  e.stopPropagation();

  toggleBtn.classList.toggle("menu-active");

  tlinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn || e.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      tlinks.classList.toggle("open");

      toggleBtn.classList.toggle("menu-active");
    }
  }
});

tlinks.onclick = (e) => {
  e.stopPropagation();
};

document.querySelector(".footer .footer-bottom span").innerHTML =
  currentYear.getFullYear();
