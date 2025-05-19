const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const users = require('../models/users');

router.post('/settings', async (req, res) => {
    const userId = req.session.user?.id;
    if (!userId) {
        return res.redirect('/login');
    }

    const { avatar, newLogin, currentPassword, newPassword } = req.body;

    try {
        const user = await users.findById(userId);
        if (!user) {
            return res.redirect('/login');
        }

        const updateData = {};

        if (avatar) {
            updateData.avatar = avatar;
        }

        if (newLogin && newLogin !== user.login) {
            // Перевірка чи новий логін вже не зайнятий
            const existing = await users.findByLogin(newLogin);
            if (existing) {
                return res.redirect('/settings?error=Login+already+exists');
            }
            updateData.login = newLogin;
        }

        if (currentPassword && newPassword) {
            const passwordMatch = await bcrypt.compare(currentPassword, user.password);
            if (!passwordMatch) {
                return res.redirect('/settings?error=Current+password+is+incorrect');
            }
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            updateData.password = hashedNewPassword;
        } else if (currentPassword || newPassword) {
            return res.redirect('/settings?error=Please+fill+both+password+fields');
        }

        if (Object.keys(updateData).length > 0) {
            await users.update(userId, updateData);
            if (updateData.login) {
                req.session.user.login = updateData.login;
            }
            if (updateData.avatar) {
                req.session.user.avatar = updateData.avatar;
            }
        }

        res.redirect('/settings?success=Changes+saved');
    } catch (err) {
        console.error(err);
        res.redirect('/settings?error=Update+failed');
    }
});

module.exports = router;
