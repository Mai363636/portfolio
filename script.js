// nav
const nav = document.getElementById('nav'),
    navToggle = document.getElementById('navToggle'),
    navLinks = document.querySelectorAll('.nav-link');

navToggle?.addEventListener('click', function () {
    nav.classList.toggle('toggle');
})

navLinks.forEach(function (li) {
    li.addEventListener('click', function () {
        nav.classList.remove('toggle');
    })
})

// swiper
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
        660: {
            slidesPerView: 2,
        },
        900: {
            slidesPerView: 3,
        }
    }
});

// color
let theme = document.getElementById('theme'),
    theme_icon,
    el = document.createElement('i');
if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
    el.classList.add('bx', 'bxs-sun');
    theme_icon = 'sun';
} else {
    el.classList.add('bx', 'bxs-moon');
    theme_icon = 'moon';
}
theme.appendChild(el);

theme.addEventListener('click', function () {

    var dark = getComputedStyle(document.documentElement).getPropertyValue('--bg-color'),
        light = getComputedStyle(document.documentElement).getPropertyValue('--text-color');

    document.documentElement.style.setProperty('--bg-color', light);
    document.documentElement.style.setProperty('--text-color', dark);

    if (theme_icon == 'sun') {
        theme.firstElementChild.classList = 'bx bxs-moon';
        theme_icon = 'moon';

    } else {
        theme.firstElementChild.classList = 'bx bxs-sun';
        theme_icon = 'sun';
    }
})

// nav observer
const scrollTop = document.getElementById('scrollTop');
const navOptions = {
    rootMargin: "-50% 0px",
};
const sections = document.querySelectorAll('section');
const navObserver = new IntersectionObserver(nav_intersect, navOptions);

sections.forEach(function (section) {
    navObserver.observe(section);
})

function nav_intersect(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // nav
            navLinks.forEach(function (navLink) { navLink.classList.remove('active') });
            nav.querySelector('.' + entry.target.id)?.classList.add('active');
            // scroll top
            if (entry.target.id == 'top') {
                scrollTop.style.display = 'none';
            }
        }

        if (!entry.isIntersecting) {
            if (entry.target.id == 'top') {
                scrollTop.style.display = 'flex';
            }
        }
    });
}

// animation observer
const animationOptions = {
    threshold: [0.2]
};
const animations = document.querySelectorAll(['.left', '.right', '.up', '.progress', '.down', '.jump', '.count']);
const animationObserver = new IntersectionObserver(animation_intersect, animationOptions);

animations.forEach(function (animation) {
    animationObserver.observe(animation);
})

function animation_intersect(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('count')) {
                count(entry);
            } else {
                entry.target.classList.add('active');
            }
        } else if (!entry.isIntersecting) {
            // entry.target.classList.remove('active');
        }
    });
}

// count
function count(entry) {
    let maxNum = parseFloat(entry.target.dataset.max),
        counterId,
        duration = 1500 / maxNum;
    function countUp() {
        let currentNum = parseFloat(entry.target.innerHTML);
        if (currentNum < maxNum) {
            entry.target.innerText = currentNum + 1 + '%';
        }

        if (currentNum == maxNum) {
            clearInterval(counterId);
        }
    }

    counterId = setInterval(countUp, duration);
}
