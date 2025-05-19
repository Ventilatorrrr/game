const db = require('../db');
const bcrypt = require('bcrypt');

const create = async (login, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.promise().query(
        'INSERT INTO users (login, email, password) VALUES (?, ?, ?)',
        [login, email, hashedPassword]
    );
};

const findByLogin = async (login) => {
    const [rows] = await db.promise().query(
        'SELECT * FROM users WHERE login = ?',
        [login]
    );
    return rows[0];
};

const findByEmail = async (email) => {
    const [rows] = await db.promise().query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
};

const update = async (id, updates) => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    values.push(id);
    await db.promise().query(
        `UPDATE users SET ${setClause} WHERE id = ?`,
        values
    );
};

const findById = async (id) => {
    const [rows] = await db.promise().query(
        'SELECT * FROM users WHERE id = ?',
        [id]
    );
    return rows[0];
};

module.exports = {
    create,
    findByLogin,
    findByEmail,
    findById,
    update
};
