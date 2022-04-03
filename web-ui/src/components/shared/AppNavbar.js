import { AppBar } from '@material-ui/core';
import React from 'react';
import NavbarSession from './navbar/NavbarSession';
import { useStateValue } from '../../context/store';
function AppNavbar() {
    const [{sesionUsuario},dispatch] = useStateValue();
    return sesionUsuario ? (sesionUsuario.autenticado === true ? <AppBar position="static"><NavbarSession/></AppBar> : null) : null
};

export default AppNavbar;