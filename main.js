"use strict";

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--float");
    navbarToggleBtn.classList.add("btn--move");
  } else {
    navbar.classList.remove("navbar--float");
    navbarToggleBtn.classList.remove("btn--move");
  }
});

// Handle scrolling
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar toggle button
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle click on "contact me" button
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// make home slowly fade
const home = document.querySelector("#home");
const homeContainer = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  homeContainer.style.opacity = 1 - (window.scrollY * 1.3) / homeHeight;
});

// Handle scroll animation

// about
const aboutSection = document.querySelector(".section__container");
const aboutHeight = aboutSection.getBoundingClientRect().height;

// skills
const skillsSection = document.querySelector("#skills").firstElementChild;
const skillsHeight = skillsSection.getBoundingClientRect().height;
const skillsTitle = skillsSection.firstElementChild;
const skillsetConfident = skillsSection.lastElementChild.firstElementChild;
const skillsetUsed = skillsSection.lastElementChild.lastElementChild;
let skillValueSwitch = true;

// projects
const workSection = document.querySelector("#work").firstElementChild;
const workTitle = workSection.querySelector("h1");
const workCategory = workSection.querySelector(".work__categories");
const workProject = workSection.querySelector(".work__projects");

document.addEventListener("scroll", () => {
  // about
  if (window.scrollY > homeHeight / 3) {
    aboutSection.classList.add("animated");
  }

  // skill
  if (window.scrollY > homeHeight - aboutHeight / 3) {
    skillsTitle.classList.add("animated");
  }
  if (window.scrollY > homeHeight) {
    skillsetConfident.classList.add("animated");
    if (skillValueSwitch) {
      const skillValues = document.querySelectorAll(".skill__value");
      setTimeout(() => {
        skillValues.forEach((node, index) => {
          setTimeout(() => {
            node.style.width = `${node.dataset.point}%`;
          }, 100 * index);
        });
      }, 1200);
    }
    skillValueSwitch = false;
  }

  if (window.scrollY > homeHeight + aboutHeight) {
    skillsetUsed.classList.add("animated");
  }

  // work
  if (window.scrollY > homeHeight + aboutHeight + skillsHeight / 3) {
    workTitle.classList.add("animated");
  }
  if (window.scrollY > homeHeight + aboutHeight + skillsHeight / 1.5) {
    workCategory.classList.add("animated");
    setTimeout(() => {
      workProject.classList.add("animated");
    }, 300);
  }
});

// show "arrow uy" button
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Remove selection and select the new
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anime-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anime-out");
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
