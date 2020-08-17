/**
 * Define Global Variables
 *
 */

let sections = document.getElementsByTagName('section');
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function removeActiveClassFromAllSections() {
    for (const section of sections)
        section.classList.remove('active');
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

function generateDynNavMenu (){
    for (let i = 0; i < sections.length; i++){
        const list = document.getElementById('navbar__list');

        const listItem = document.createElement('li');
        listItem.setAttribute('id', `navli${i}`);

        const listLink = document.createElement('a');
        listLink.textContent = sections[i].getAttribute('data-nav');
        listLink.setAttribute('id', `navlink${i}`);
        listLink.setAttribute('href', `#${sections[i].getAttribute('id')}`);
        listLink.classList.add('menu__link', 'menu__link:hover');
        listLink.addEventListener('click', function () {
            sections[i].scrollTo({behavior: 'smooth', top: 100, left: 100,});
            event.preventDefault();
        });

        listItem.appendChild(listLink);
        list.appendChild(listItem);
    }
}

// build the nav
generateDynNavMenu();

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', function setActiveClass() {
    for(const section of sections){
        if(isInViewport(section)){
            removeActiveClassFromAllSections();
            section.classList.add('active');
        }
    }
});

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

