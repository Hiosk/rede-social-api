const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password, nome } = req.body;

    const user = new User({ email, password, nome });

    await user.save();
    
    res.send({ message: 'Usuário registrado com sucesso!' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.send({ error: 'Email ou senha inválidos' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.send({ error: 'Email ou senha inválidos' });
    }

    const token = jwt.sign({ _id: user._id }, 'secret_key');

    res.send({ token });
});

module.exports = router;