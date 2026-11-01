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
const appWindow = document.getElementById('app-window');
const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');
const searchInput = document.getElementById('win-search');
const navItems = document.querySelectorAll('.nav-item');
const menuItems = document.querySelectorAll('.start-menu li[data-page]');
const desktopIcons = document.querySelectorAll('.desktop-icon[data-page]');

// Обновляет содержимое окна, не трогая его видимость
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
    startMenu.style.display = 'none';
}

// Открыть раздел: обновить контент И показать окно (если было
// свёрнуто/закрыто) — так работают иконки на рабочем столе, пункты
// меню "Пуск" и панель задач
function openPage(pageKey) {
    navigateTo(pageKey);
    appWindow.style.display = 'flex';
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => openPage(e.target.getAttribute('data-page')));
});
menuItems.forEach(item => {
    item.addEventListener('click', (e) => openPage(e.target.getAttribute('data-page')));
});
desktopIcons.forEach(icon => {
    icon.addEventListener('click', (e) => openPage(e.currentTarget.getAttribute('data-page')));
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

// --- Кнопки окна (_, [], X) — теперь рабочие ---
// Свернуть и закрыть одинаково прячут окно, открывая "рабочий стол"
// с иконками под ним (отдельный демо-режим "закрыто" тут не нужен).
// Развернуть — переключает окно на весь экран ноутбука и обратно.
document.getElementById('win-minimize').addEventListener('click', (e) => {
    e.stopPropagation();
    appWindow.style.display = 'none';
});
document.getElementById('win-close').addEventListener('click', (e) => {
    e.stopPropagation();
    appWindow.style.display = 'none';
});
document.getElementById('win-maximize').addEventListener('click', (e) => {
    e.stopPropagation();
    appWindow.classList.toggle('maximized');
});

// --- Тема содержимого экрана (светлая/тёмная "ОС") ---
// Хранится отдельным ключом в localStorage, чтобы выбор сохранялся
// между визитами. Независима от цвета корпуса ниже.
const SCREEN_THEME_KEY = 'laptop-screen-theme';
const laptopScreenEl = document.querySelector('.laptop-screen');
const settingsThemeBtn = document.getElementById('settings-theme-toggle');

function applyScreenTheme(theme) {
    laptopScreenEl.setAttribute('data-screen-theme', theme);
    settingsThemeBtn.textContent = theme === 'light' ? '☀️ Светлая' : '🌙 Тёмная';
}

let savedScreenTheme = 'dark';
try {
    savedScreenTheme = localStorage.getItem(SCREEN_THEME_KEY) || 'dark';
} catch (e) { /* localStorage недоступен (приватное окно и т.п.) — не критично для демо */ }
applyScreenTheme(savedScreenTheme);

settingsThemeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const current = laptopScreenEl.getAttribute('data-screen-theme');
    const next = current === 'light' ? 'dark' : 'light';
    applyScreenTheme(next);
    try { localStorage.setItem(SCREEN_THEME_KEY, next); } catch (e) { /* см. выше */ }
});

// --- Цвет корпуса ноутбука ---
const CASE_COLOR_KEY = 'laptop-case-color';
const settingsCaseBtn = document.getElementById('settings-case-toggle');

function applyCaseColor(color) {
    document.documentElement.setAttribute('data-case', color);
    settingsCaseBtn.textContent = color === 'light' ? '⚪ Светлый' : '⚫ Тёмный';
}

let savedCaseColor = 'dark';
try {
    savedCaseColor = localStorage.getItem(CASE_COLOR_KEY) || 'dark';
} catch (e) { /* см. выше */ }
applyCaseColor(savedCaseColor);

settingsCaseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const current = document.documentElement.getAttribute('data-case');
    const next = current === 'light' ? 'dark' : 'light';
    applyCaseColor(next);
    try { localStorage.setItem(CASE_COLOR_KEY, next); } catch (e) { /* см. выше */ }
});

// --- Окно "Параметры" ---
// Открывается с иконки рабочего стола или пункта меню "Пуск",
// закрывается кнопкой X в заголовке.
const settingsWindow = document.getElementById('settings-window');

function openSettings(e) {
    if (e) e.stopPropagation();
    settingsWindow.style.display = 'flex';
    startMenu.style.display = 'none';
}
document.getElementById('desktop-settings-icon').addEventListener('click', openSettings);
document.getElementById('start-settings').addEventListener('click', openSettings);
document.getElementById('settings-close').addEventListener('click', (e) => {
    e.stopPropagation();
    settingsWindow.style.display = 'none';
});

// --- Часы в трее ---
// Берут время прямо из браузера посетителя (new Date() без какой-либо
// фиксированной зоны) — поэтому всегда показывают именно его локальное
// время, а не время сервера или произвольное значение.
const trayClockEl = document.getElementById('tray-clock');

function updateTrayClock() {
    const now = new Date();
    trayClockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
updateTrayClock();
setInterval(updateTrayClock, 1000);
