const bcrypt = require('bcrypt');
const users = require('../models/users');

exports.loginPage = (req, res) => {
    res.sendFile('login.html', { root: './views' });
};

exports.registerPage = (req, res) => {
    res.sendFile('register.html', { root: './views' });
};

exports.homePage = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.sendFile('home.html', { root: './views' });
};

exports.registerUser = async (req, res) => {
    const { login, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.redirect('/register?error=Passwords+do+not+match');
    }

    try {
        const existingLogin = await users.findByLogin(login);
        const existingEmail = await users.findByEmail(email);

        if (existingLogin) {
            return res.redirect('/register?error=Login+already+exists');
        }

        if (existingEmail) {
            return res.redirect('/register?error=Email+already+in+use');
        }

        await users.create(login, email, password);
        res.redirect('/login');
    } catch (err) {
        res.redirect('/register?error=Registration+failed');
    }
};

exports.loginUser = async (req, res) => {
    const { login, password } = req.body;
    try {
        const user = await users.findByLogin(login);

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            res.redirect('/home');
        } else {
            res.redirect('/login?error=Incorrect+login+or+password');
        }
    } catch (err) {
        res.redirect('/login?error=Login+failed');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

