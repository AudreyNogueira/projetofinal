const { validationResult } = require('express-validator');
const crypto = require('crypto');

const vendedor = require('../model/Vendedor');
const { stringify } = require('querystring');

class VendedorController {
    cadastrarVendedorAction(req,res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //  validacao(req,res) {
        //      if(string.lenght <= 5)
        //      return console.log('ola mundo')
        //  }

        const {nome,negocio,endereco,cpf,email,telefone,senha,confSenha} = req.body;

        if (senha != confSenha) {
            return res.status(400).json("As senhas devem ser iguais");
        }
        
        vendedor.nome = nome;
        vendedor.negocio = negocio;
        vendedor.endereco = endereco;
        vendedor.cpf = cpf;
        vendedor.email = email;
        vendedor.telefone = telefone;
        vendedor.senha = crypto.createHash("sha256").update(senha).digest("hex");
        vendedor.cadastrar(req, res);
    }             
}

module.exports = new VendedorController