/**
 * Define Global Variables
 *
 */

const sections = document.getElementsByTagName('section');
/**
 *Helper Functions
 */

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const removeActiveClassFromAllSections = () => {
    for (const section of sections)
        section.classList.remove('active');
};

/**
 * Main Functions
 */

const generateDynNavMenu = () =>{
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
            sections[i].scrollIntoView({behavior: "smooth",block: "end", inline: "nearest"});
            event.preventDefault();
        });

        listItem.appendChild(listLink);
        list.appendChild(listItem);
    }
};

const setSectionActiveClass = () => {
    for(const section of sections){
        if(isInViewport(section)){
            removeActiveClassFromAllSections();
            section.classList.add('active');
        }
    }
};

// build the nav
generateDynNavMenu();

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', setSectionActiveClass);


