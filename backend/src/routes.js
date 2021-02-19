const { Router } = require("express");
const { body } = require('express-validator');
const { cpf } = require('cpf-cnpj-validator');


const clienteController = require('./controller/ClienteController');
const vendedorController = require('./controller/VendedorController');
const LoginController = require('./controller/LoginController');

const routes = new Router;

routes.post(
    "/cliente",
    body('nome').isLength({min:3}).withMessage("* campo obrigatório!"),
    body('email').isEmail().withMessage("* campo obrigatório!"),
    body('senha').isLength({min:6}).withMessage("* campo obrigatório!"),
    clienteController.cadastrarClienteAction
);

routes.post(
    "/vendedor",
    body('nome').isLength({min:3}).withMessage("* campo obrigatório!"),
    body('negocio'),
    body('endereco').isLength({min:3}).withMessage("* campo obrigatório!"),    
    body('cpf').custom(value => {
        if(!cpf.isValid(cpf.strip(value))) {
            return Promise.reject("CPF invalido!");
        }
        return true;
    }),
    body('email').isEmail(),
    body('telefone').isLength({min:9}),
    body('senha').isLength({min:6}),
    vendedorController.cadastrarVendedorAction
);

routes.post(
    "/login",
    LoginController.loginAction
)

module.exports = routes;