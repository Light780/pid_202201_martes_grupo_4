import { Avatar, Button, Container, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../context/store';
import {style} from '../tools/style'
import { loginUsuario } from '../../actions/UsuarioAction';
function Login(){
    const navigate = useNavigate()
    const [{sesionUsuario, openSnackBar},dispatch] = useStateValue();    
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
        loginUsuario(usuario,dispatch).then(response => {            
            if(response.status===200){
                window.localStorage.setItem('id',response.data.usuarioId)                
                navigate("/")
            }else{
                dispatch({
                    type:'OPEN_SNACKBAR',
                    openMensaje:{
                        open:true,
                        mensaje:'Las credenciales del usuario son incorrectas',
                        severity:'error'
                    }
                })
            }
        })
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
                    <TextField type="password"variant="outlined" value={usuario.Password} onChange={ingresarValores} label="Ingrese contraseña" name="Password" fullWidth margin="normal"/>
                    <Button type="submit" fullWidth variant="contained" color="primary" style={style.submit} onClick={loginClick}>Iniciar Sesion</Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;