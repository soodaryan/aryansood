'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalMeta = document.querySelector("[data-modal-meta]");

// modal helpers
const openModal = function () {
  modalContainer.classList.add("active");
  overlay.classList.add("active");
}

const closeModal = function () {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalMeta.innerHTML = "";
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    openModal();

  });

}

// add click event to modal close button
if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
}

// project modal variables
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalText = document.querySelector("[data-project-modal-text]");

const openProjectModal = function () {
  projectModalContainer.classList.add("active");
  projectOverlay.classList.add("active");
}

const closeProjectModal = function () {
  projectModalContainer.classList.remove("active");
  projectOverlay.classList.remove("active");
}

if (projectModalCloseBtn && projectOverlay) {
  projectModalCloseBtn.addEventListener("click", closeProjectModal);
  projectOverlay.addEventListener("click", closeProjectModal);
}

// transcript modal variables
const transcriptOpenBtn = document.querySelector("[data-transcript-open]");
const transcriptModalContainer = document.querySelector("[data-transcript-modal-container]");
const transcriptModalCloseBtn = document.querySelector("[data-transcript-modal-close]");
const transcriptOverlay = document.querySelector("[data-transcript-overlay]");

const openTranscriptModal = function () {
  transcriptModalContainer.classList.add("active");
  transcriptOverlay.classList.add("active");
}

const closeTranscriptModal = function () {
  transcriptModalContainer.classList.remove("active");
  transcriptOverlay.classList.remove("active");
}

if (transcriptOpenBtn && transcriptModalContainer && transcriptOverlay) {
  transcriptOpenBtn.addEventListener("click", openTranscriptModal);
}

if (transcriptModalCloseBtn && transcriptOverlay) {
  transcriptModalCloseBtn.addEventListener("click", closeTranscriptModal);
  transcriptOverlay.addEventListener("click", closeTranscriptModal);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// project detail buttons
const projectInfoBtns = document.querySelectorAll("[data-project-info]");

for (let i = 0; i < projectInfoBtns.length; i++) {
  projectInfoBtns[i].addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const projectItem = this.closest(".project-item");
    const projectTitle = projectItem.querySelector(".project-title").innerHTML;
    const projectDescription = projectItem.querySelector(".project-description").innerHTML;

    projectModalTitle.innerHTML = projectTitle;
    projectModalText.innerHTML = `<p>${projectDescription}</p>`;
    openProjectModal();
  });
}




// resume quick access
const resumeQuickAccess = document.querySelector("[data-resume-quick-access]");
const resumeSections = document.querySelectorAll("[data-resume-section]");

if (resumeQuickAccess && resumeSections.length) {
  for (let i = 0; i < resumeSections.length; i++) {
    const sectionTitle = resumeSections[i].querySelector(".title-wrapper .h3").innerText;
    const quickLink = document.createElement("a");
    quickLink.href = `#${resumeSections[i].id}`;
    quickLink.innerText = sectionTitle;

    quickLink.addEventListener("click", function (event) {
      event.preventDefault();
      resumeSections[i].scrollIntoView({ behavior: "smooth", block: "start" });
    });

    resumeQuickAccess.appendChild(quickLink);
  }

  const resumeQuickLinks = resumeQuickAccess.querySelectorAll("a");

  const updateResumeQuickAccess = function () {
    let activeIndex = 0;

    for (let i = 0; i < resumeSections.length; i++) {
      const sectionTop = resumeSections[i].getBoundingClientRect().top;
      if (sectionTop <= 150) activeIndex = i;
    }

    for (let i = 0; i < resumeQuickLinks.length; i++) {
      resumeQuickLinks[i].classList.toggle("active", i === activeIndex);
    }
  }

  updateResumeQuickAccess();
  window.addEventListener("scroll", updateResumeQuickAccess);
}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
sidebar.classList.toggle("resume-mode", document.querySelector('[data-page="resume"]')?.classList.contains("active"));

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        sidebar.classList.toggle("resume-mode", pages[i].dataset.page === "resume");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
