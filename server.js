const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

// Налаштовуємо helmet з CSP
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "blob:"],
            scriptSrcElem: ["'self'", "blob:"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "blob:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            frameSrc: ["'none'"],
            mediaSrc: ["'self'"],
            workerSrc: ["'self'", "blob:"],
        }
    }
}));

// Серверна конфігурація
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Сесії
app.use(session({
    secret: 'mysecret', // краще замінити на більш складний секрет
    resave: false,
    saveUninitialized: false
}));

// Статичні файли
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/image', express.static(path.join(__dirname, 'image')));

// Підключення views (наприклад, EJS або pug)
app.set('views', path.join(__dirname, 'views'));

// Маршрути
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

const settingsRoutes = require('./routes/settingsRoutes');
app.use('/', settingsRoutes);

app.get('/loading', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'loading.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
