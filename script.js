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

// --- Тема содержимого экрана (светлая/тёмная "ОС") ---
// Независима от цвета корпуса ниже. Хранится отдельным ключом в
// localStorage, чтобы выбор сохранялся между визитами.
const SCREEN_THEME_KEY = 'laptop-screen-theme';
const laptopScreenEl = document.querySelector('.laptop-screen');
const themeToggleBtn = document.getElementById('theme-toggle');

function applyScreenTheme(theme) {
    laptopScreenEl.setAttribute('data-screen-theme', theme);
    themeToggleBtn.textContent = theme === 'light' ? '☀️' : '🌙';
}

let savedScreenTheme = 'dark';
try {
    savedScreenTheme = localStorage.getItem(SCREEN_THEME_KEY) || 'dark';
} catch (e) { /* localStorage недоступен (приватное окно и т.п.) — не критично для демо */ }
applyScreenTheme(savedScreenTheme);

themeToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // не закрывать меню "Пуск" и не путать с кликом по странице
    const current = laptopScreenEl.getAttribute('data-screen-theme');
    const next = current === 'light' ? 'dark' : 'light';
    applyScreenTheme(next);
    try { localStorage.setItem(SCREEN_THEME_KEY, next); } catch (e) { /* см. выше */ }
});

// --- Цвет корпуса ноутбука (снаружи) ---
// Отдельная кнопка вне экрана, свой ключ в localStorage.
const CASE_COLOR_KEY = 'laptop-case-color';
const caseToggleBtn = document.getElementById('case-toggle');

function applyCaseColor(color) {
    document.documentElement.setAttribute('data-case', color);
}

let savedCaseColor = 'dark';
try {
    savedCaseColor = localStorage.getItem(CASE_COLOR_KEY) || 'dark';
} catch (e) { /* см. выше */ }
applyCaseColor(savedCaseColor);

caseToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-case');
    const next = current === 'light' ? 'dark' : 'light';
    applyCaseColor(next);
    try { localStorage.setItem(CASE_COLOR_KEY, next); } catch (e) { /* см. выше */ }
});
