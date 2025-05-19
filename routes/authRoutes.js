const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', authController.loginPage);
router.post('/login', authController.loginUser);

router.get('/register', authController.registerPage);
router.post('/register', authController.registerUser);

router.get('/home', authController.homePage);

router.get('/play', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.sendFile('play.html', { root: './views' });
});

router.get('/rules', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.sendFile('rules.html', { root: './views' });
});

router.get('/settings', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.sendFile('settings.html', { root: './views' });
});

router.get('/authors', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.sendFile('authors.html', { root: './views' });
});

// logout
router.get('/logout', authController.logout);

module.exports = router;