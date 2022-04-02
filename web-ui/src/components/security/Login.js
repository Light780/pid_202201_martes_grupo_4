import { Avatar, Button, Container, TextField, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons/';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../tools/style'
function Login(){
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState({
        Email:'',
        Password:''
    })    
    const ingresarValores = e => {
        const {name, value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]:value
        }))
    }
    const loginClick = e => {
        e.preventDefault();
        navigate('/');
    }
    return (
        <Container maxWidth="xs">
            <div style={style.paper}>
                <Avatar style={style.avatar}>
                    <LockOutlined style={style.icon}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form style={style.form}>
                    <TextField variant="outlined" value={usuario.Email} onChange={ingresarValores} label="Ingrese email" name="Email" fullWidth margin="normal"/>
                    <TextField variant="outlined" value={usuario.Password} onChange={ingresarValores} label="Ingrese contraseña" name="Password" fullWidth margin="normal"/>
                    <Button type="submit" fullWidth variant="contained" color="primary" style={style.submit} onClick={loginClick}>Iniciar Sesion</Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;