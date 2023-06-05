const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ error: 'Token não fornecido' });
    }

    jwt.verify(token, 'secret_key', async (err, decoded) => {
        if (err) {
            return res.status(403).send({ error: 'Falha ao autenticar o token' });
        }

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }

        req.user = user;

        next();
    });
};