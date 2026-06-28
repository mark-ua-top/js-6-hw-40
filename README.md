# 📒 Книга контактів

Сучасний застосунок для управління контактами, побудований на React + Redux Toolkit.

![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-764abc?logo=redux)
![Vite](https://img.shields.io/badge/Vite-7.x-646cff?logo=vite)

## 🚀 Демо

**Live:** [https://mark-ua-top.github.io/js-6-hw-40](https://mark-ua-top.github.io/js-6-hw-40)

## ✨ Функціонал

- ✅ Реєстрація та авторизація користувачів
- ✅ Додавання/видалення контактів
- ✅ Пошук контактів за ім'ям
- ✅ Збереження даних в хмарі (API)
- ✅ Захищені маршрути
- ✅ Адаптивний дизайн

## 🛠️ Технології

- **React 19** — UI бібліотека
- **Redux Toolkit** — управління станом
- **React Router** — маршрутизація
- **Axios** — HTTP-запити
- **Tailwind CSS** — стилізація
- **Vite** — збірка проекту

## 📦 Встановлення

```bash
# Клонування репозиторію
git clone https://github.com/mark-ua-top/js-6-hw-40.git

# Перехід в директорію
cd js-6-hw-40

# Встановлення залежностей
npm install
```

## 🖥️ Локальний запуск

```bash
# Запуск dev-сервера (відкриється на http://localhost:3000)
npm run dev

# або
npm start
```

## 📋 Доступні скрипти

| Скрипт | Опис |
|--------|------|
| `npm run dev` | Запуск dev-сервера |
| `npm start` | Аліас для dev |
| `npm run build` | Збірка для продакшену |
| `npm run preview` | Перегляд production-збірки |
| `npm run deploy` | Деплой на GitHub Pages |
| `npm run clean` | Очистка кешу та dist |

## 🚀 Деплой на GitHub Pages

```bash
# Збірка та деплой одною командою
npm run deploy
```

Після виконання команди сайт буде доступний за адресою:
`https://mark-ua-top.github.io/js-6-hw-40`

### Налаштування GitHub Pages

1. Перейдіть в Settings → Pages вашого репозиторію
2. В розділі "Source" виберіть гілку `gh-pages`
3. Натисніть Save

## 🔐 API

Застосунок використовує [GoIT Connections API](https://connections-api.goit.global/):

- `POST /users/signup` — реєстрація
- `POST /users/login` — вхід
- `POST /users/logout` — вихід
- `GET /users/current` — поточний користувач
- `GET /contacts` — отримання контактів
- `POST /contacts` — додавання контакту
- `DELETE /contacts/:id` — видалення контакту

## 📁 Структура проекту

```
src/
├── components/          # Компоненти UI
│   ├── App/
│   ├── ContactForm/
│   ├── ContactItem/
│   ├── ContactList/
│   ├── Filter/
│   ├── Layout/
│   ├── Loader/
│   ├── Navigation/
│   ├── UserMenu/
│   ├── AuthNav/
│   ├── PrivateRoute/
│   └── PublicRoute/
├── pages/               # Сторінки
│   ├── HomePage/
│   ├── LoginPage/
│   ├── RegisterPage/
│   └── ContactsPage/
├── redux/               # Redux логіка
│   ├── auth/
│   ├── contacts/
│   ├── filter/
│   └── store.js
└── main.tsx             # Точка входу
```

## 📝 Ліцензія

MIT © 2024
