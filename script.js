// База данных контента страниц сайта
const pages = {
    about: `
        <h2>О компании</h2>
        <p>Мы — передовая команда веб-разработчиков и дизайнеров. Создаем уникальные интерактивные проекты, которые запоминаются с первого взгляда.</p>
        <p>Наш девиз: "Интерфейсы без границ!"</p>
    `,
    services: `
        <h2>Наши услуги</h2>
        <ul>
            <li>Разработка адаптивных сайтов</li>
            <li>Создание интерактивных UI/UX прототипов</li>
            <li>Оптимизация производительности веб-приложений</li>
        </ul>
    `,
    contacts: `
        <h2>Контакты</h2>
        <p>Свяжитесь с нами прямо сейчас:</p>
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
