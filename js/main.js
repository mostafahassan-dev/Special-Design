let mainColor = localStorage.getItem("color");
let lis = document.querySelectorAll(".colors-list li");

if (mainColor !== null) {
 
  document.documentElement.style.setProperty("--main--color", mainColor);

  lis.forEach((li) => {
    li.classList.remove("active");

    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
}
//Toggle Classes On Icon && Sitting-Box

document.querySelector(".icon-container i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".icon-container").classList.toggle("spin");
  document.querySelector(".sittings-box").classList.toggle("open");
};

//Switch Colors

lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main--color",
      e.currentTarget.dataset.color
    );

    lis.forEach((li) => {
      li.classList.remove("active");
    });
    e.currentTarget.classList.add("active");

    window.localStorage.setItem("color", e.currentTarget.dataset.color);
  });
});

//Switch Background

let randomBackground = document.querySelectorAll(".random-background span");
let backgroundOption = true;
let backgroundInterval;

//Check
let localBackground = localStorage.getItem("background");
let localspan = localStorage.getItem("active-span");
//Ceck Random
if (localBackground !== null) {
  //Remove Active Class
  randomBackground.forEach((span) => {
    span.classList.remove("active");
  });

  //IF localBackground ? (BGO) =>tru & Add active to "yes"
  if (localBackground === "true") {
    backgroundOption = true;
    document.querySelector(".yes").classList.add("active");

    //IF localBackground = false => (BGO) =>fals & Add active to "no"
  } else {
    backgroundOption = false;
    document.querySelector(".no").classList.add("active");
  }
}

//Add Active Span
randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    //Remove Active From All Span
    randomBackground.forEach((span) => {
      span.classList.remove("active");
    });
    //Add Active
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      rondomizImg();

      localStorage.setItem("background", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);

      localStorage.setItem("background", false);
    }
  });
});

// select landing page element

let landingPage = document.querySelector(".landing-page");

// Array of Imge

let imgsAray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
//Backgroun Option

function rondomizImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get random Number
      let randomNumber = Math.floor(Math.random() * imgsAray.length);
      //change BackGround Image Url
      landingPage.style.backgroundImage =
        'url("images/' + imgsAray[randomNumber] + '")';
    }, 5000);
  }
}
rondomizImg();

//Get Skills

let skillBox = document.querySelectorAll(".skill-box");
let skillProgress = document.querySelectorAll(".skill-progress span");

const Options = {
  rootMargin: "-30px",
  threshold: 0.1,
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // console.log(entry.target) => skill-box

      skillProgress.forEach((span) => {
        span.style.width = span.dataset.progress;
      });
    }
    //    ==>> __ To Remove Progress __ <<==

    /*  else{
        skillProgress.forEach(span =>{
          span.style.width= 0  
        })
      }*/
  });
}, Options);

skillBox.forEach((skill) => {
  observer.observe(skill);
});

//Start Gallery
//Creat Popup
let gallery = document.querySelectorAll(".gallery img");

gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Creat Overlay Element
    let overlay = document.createElement("div");

    //Add class to overlay
    overlay.classList.add("popup");

    //Append overlay to body
    document.body.appendChild(overlay);

    //Close popup
    overlay.addEventListener("click", (e) => {
      if (e.target.className === "popup") {
        overlay.remove();
      }
    });
    //Creat popup
    let popup = document.createElement("div");
    popup.classList.add("popup-box");

    //Creat Close Span
    let CloseButton = document.createElement("span");
    CloseButton.innerHTML = "x";
    CloseButton.classList.add("close");
    popup.appendChild(CloseButton);

    //Creat img title

    if (img.alt !== null) {
      let title = document.createElement("h3");
      title.classList.add("img-title");
      title.innerHTML = img.alt;
      popup.appendChild(title);
    }

    //Creat img
    let popupImg = document.createElement("img");

    //Set img source
    popupImg.src = img.src;

    //Append img to popup
    popup.appendChild(popupImg);

    //Append popup to overlay
    overlay.appendChild(popup);
  });
});

//Close popup
document.addEventListener("click", (e) => {
  if (e.target.className === "close") {
    //Remove popup && overlay
    e.target.parentNode.remove();
    document.querySelector(".popup").remove();
  }
});
//End Gallery

//select all bullets

let allbullets = document.querySelectorAll(".nav-bullets .bullet");

allbullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    //go to the correct clicked section smoothly
    document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
      behavior: "smooth",
    });

    location.hash = e.target.dataset.section;
  });
});

//bullets option

let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsSpan = document.querySelectorAll(".bullets-option span");
//local check
let localBullets = localStorage.getItem("bullets");
if (localBullets !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (localBullets === "true") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    //Remove Active From All Span
    bulletsSpan.forEach((span) => {
      span.classList.remove("active");
    });
    //Add Active
    e.target.classList.add("active");
    if (e.target.dataset.bullet === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets", true);
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets", false);
    }
  });
});

//reset
document.querySelector(".reset").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

//Toggle menu-active
let menu = document.querySelector(".menu");
let links = document.querySelector(".nav");

menu.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  links.classList.toggle("open");
};
links.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== menu && e.target !== links) {
    menu.classList.remove("menu-active");
    links.classList.remove("open");
  }
});
