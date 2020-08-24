/**
 * Define Global Variables
 *
 */

const sections = document.getElementsByTagName('section');
const list = document.getElementById('navbar__list');

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

const removeActiveClassFromAllElements = (elements) => {
    for (const e of elements)
        e.classList.remove('active');
};


/**
 * Main Functions
 */

/**
 * constructs the menu
 * and add event listener of 'click' to navigate to the right section
 * add active class to the clicked menu item
 */
const generateDynNavMenu = () =>{
    for (let i = 0; i < sections.length; i++){
        const listItem = document.createElement('li');
        const listLink = document.createElement('a');

        listItem.setAttribute('id', `navli${i}`);

        listLink.textContent = sections[i].getAttribute('data-nav');
        listLink.setAttribute('id', `navlink${i}`);
        listLink.setAttribute('href', `#${sections[i].getAttribute('id')}`);
        listLink.classList.add('menu__link', 'menu__link:hover');
        listLink.addEventListener('click', function () {
            removeActiveClassFromAllElements(list.children);
            listItem.classList.add('active');
            sections[i].scrollIntoView({behavior: "smooth",block: "center"});
            event.preventDefault();
        });

        listItem.appendChild(listLink);
        list.appendChild(listItem);
    }
};

/**
 * set active class to both the section in view and the corresponding nav menu item.
 */
const setSectionActiveClass = () => {
    for(let i = 0; i < sections.length; i++){
        if(isInViewport(sections[i])){
            removeActiveClassFromAllElements(sections);
            sections[i].classList.add('active');
            removeActiveClassFromAllElements(list.children);
            document.getElementById(`navli${i}`).classList.add('active');
        }
    }
};

const collapseSections = () => {
    const collapsibles = document.getElementsByClassName("collapsible");
    for(let i = 0; i < collapsibles.length; i++){
        collapsibles[i].addEventListener('click', function () {
            collapsibles[i].classList.toggle('active');
            const container = collapsibles[i].nextElementSibling;
            if(container.style.maxHeight){
                container.style.maxHeight = null;
            }else{
                container.style.maxHeight = container.scrollHeight + 'px';
            }
        })
    }

};


// build the nav
generateDynNavMenu();

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', setSectionActiveClass, false);

//collapse and expand
collapseSections();



