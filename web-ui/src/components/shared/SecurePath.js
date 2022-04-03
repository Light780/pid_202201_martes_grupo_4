import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateValue } from '../../context/store';
const SecurePath = ({children}) => {
    const [{sesionUsuario}, dispatch] = useStateValue();
    return sesionUsuario ? (sesionUsuario.autenticado === true ? children : <Navigate to = "/auth/login"/>) : <Navigate to = "/auth/login"/>
};

export default SecurePath;