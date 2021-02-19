import React from "react";

import Login from "../../../Components/Login";

const LoginCliente = () => {
  {/* {<div><p>{dados.}</p></div>} */}


    return(
        <Login
            titulo="Login Cliente"
            caminho="/cadastro/cliente"
        />
    );
}

export default LoginCliente;