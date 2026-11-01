// База данных контента страниц сайта
const pages = {
    about: `
        <h2>Обо мне</h2>
        <p>Я — frontend-разработчик, создаю уникальные интерактивные проекты, которые запоминаются с первого взгляда.</p>
        <p>Мой девиз: "Интерфейсы без границ!"</p>
    `,
    services: `
        <h2>Мои услуги</h2>
        <ul>
            <li>Разработка адаптивных сайтов</li>
            <li>Создание интерактивных UI/UX прототипов</li>
            <li>Оптимизация производительности веб-приложений</li>
        </ul>
    `,
    contacts: `
        <h2>Контакты</h2>
        <p>Свяжитесь со мной прямо сейчас:</p>
        <p><b>Email:</b> hello@cyberdesk.io</p>
        <p><b>Телефон:</b> +7 (999) 123-45-67</p>
    `
};

// Элементы DOM
const pageContent = document.getElementById('page-content');
const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');
const searchInput = document.getElementById('win-search');
const navItems = document.querySelectorAll('.nav-item');
const menuItems = document.querySelectorAll('.start-menu li');

// Переключение страниц
function navigateTo(pageKey) {
    if (pages[pageKey]) {
        pageContent.innerHTML = pages[pageKey];
        
        // Обновляем активный класс на панели задач
        navItems.forEach(item => {
            if (item.getAttribute('data-page') === pageKey) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    // Закрываем меню "Пуск" при переходе
    startMenu.style.display = 'none';
}

// Слушатели для панели задач
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        navigateTo(e.target.getAttribute('data-page'));
    });
});

// Слушатели для меню "Пуск"
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        navigateTo(e.target.getAttribute('data-page'));
    });
});

// Логика кнопки "Пуск"
startButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = startMenu.style.display === 'flex';
    startMenu.style.display = isVisible ? 'none' : 'flex';
});

// Закрытие меню "Пуск" при клике в любое другое место экрана ноутбука
document.addEventListener('click', () => {
    startMenu.style.display = 'none';
});

// Поиск в стиле Windows 10
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        navigateTo('about'); // Возврат по умолчанию
        return;
    }

    // Ищем совпадения по тексту страниц
    let foundPage = null;
    for (const [key, content] of Object.entries(pages)) {
        if (content.toLowerCase().includes(query)) {
            foundPage = key;
            break;
        }
    }

    if (foundPage) {
        navigateTo(foundPage);
    } else {
        pageContent.innerHTML = `
            <h2>Результаты поиска</h2>
            <p>По запросу <i>"${e.target.value}"</i> ничего не найдено. Попробуйте ввести "услуги" или "контакты".</p>
        `;
    }
});

// Инициализация первой страницы
navigateTo('about');

// Лёгкий наклон ноутбука за курсором мыши (в духе презентаций Apple) —
// ноутбук чуть поворачивается к курсору. Угол небольшой (до 3°), чтобы
// не мешать читать контент и не ломать клики по интерфейсу. На тач-экранах
// mousemove не срабатывает — ноутбук просто остаётся неподвижным, это
// нормально (нет курсора — нечему "следить").
const laptopEl = document.querySelector('.laptop');
if (laptopEl) {
    const MAX_TILT_DEG = 3;
    let rafPending = false;
    let lastEvent = null;

    function applyTilt() {
        rafPending = false;
        if (!lastEvent) return;
        const x = (lastEvent.clientX / window.innerWidth - 0.5) * 2; // -1..1
        const y = (lastEvent.clientY / window.innerHeight - 0.5) * 2; // -1..1
        laptopEl.style.setProperty('--tilt-x', (x * MAX_TILT_DEG).toFixed(2) + 'deg');
        laptopEl.style.setProperty('--tilt-y', (-y * MAX_TILT_DEG).toFixed(2) + 'deg');
    }

    window.addEventListener('mousemove', (e) => {
        lastEvent = e;
        if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(applyTilt);
        }
    });

    // Когда курсор уходит с окна — возвращаем ноутбук в нейтральное положение
    window.addEventListener('mouseleave', () => {
        laptopEl.style.setProperty('--tilt-x', '0deg');
        laptopEl.style.setProperty('--tilt-y', '0deg');
    });
}
