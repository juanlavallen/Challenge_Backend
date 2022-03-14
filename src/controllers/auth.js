const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const MailService = require('../services/mail.service');
const generateToken = require('../helpers/generate-token');

const authRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existsEmail = await User.findOne({ where: { email } });
        if (existsEmail) {
            return res.status(400).json({
                msg: `El email ${email} ya esta registrado`
            });
        }

        const user = User.build({ email, password });
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        let mail = new MailService(
            user.email,
            '¡Bienvenido!',
            `Bienvenido ${email} al maravilloso mundo de Disney`,
            `<h1>Bienvenido ${email} al maravilloso mundo de Disney</h1>`
        );

        mail.sendMail();

        await user.save();
        res.status(201).json({ user });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            msg: 'Ocurrio un error al registrarse'
        });
    }
}

const authLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                msg: 'Email o contraseña incorrecto'
            });
        }

        const verifyPassword = bcryptjs.compareSync(password, user.password);
        if (!verifyPassword) {
            return res.status(400).json({
                msg: 'Email o contraseña incorrecto'
            });
        }

        const token = await generateToken(user.id);
        res.status(200).json({ user, token });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            msg: 'Ocurrio un error al ingresar'
        });
    }
}

module.exports = {
    authRegister,
    authLogin
}