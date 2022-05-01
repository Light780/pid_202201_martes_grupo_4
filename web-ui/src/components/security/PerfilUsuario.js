import { Grid, TextField, Typography, Button, Container, Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import reactFoto from '../../logo.svg'
import ImageUploader from 'react-images-upload';
import { useStateValue } from '../../context/store';
import {style} from '../tools/style';
import { actualizarUsuario } from '../../actions/UsuarioAction';
import { blobConverter} from '../../services/Utils';
function PerfilUsuario() {
    
    const [fotoUrl, setFotoUrl] = useState("")
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [usuario, setUsuario] = useState({
        nombreCompleto: '',
        email: '',
        password: '',
        passwordConfirm: '',
        userName: '',
        fotoPerfil: ''
    })
    const ingresarValores = e => {
        const { name, value } = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]: value
        }))
    }

    useEffect(() => {
        console.log(sesionUsuario);
        setUsuario(sesionUsuario.usuario);        
        setFotoUrl(blobConverter(sesionUsuario.usuario.fotoPerfil))
    }, [])
    const subirFoto = imagenes => {
        const foto = imagenes[0];
        const fotoUrl = URL.createObjectURL(foto);
        let reader = new FileReader();
        try {
             reader.readAsDataURL(foto);
             reader.onload = () => {
                 setUsuario(anterior => ({
                     ...anterior,
                     fotoPerfil: reader.result                     
                 }))
                 setFotoUrl(fotoUrl)
             }
             reader.onerror = function (error) {
                 dispatch({
                     type: 'OPEN_SNACKBAR',
                     openMensaje: {
                         open: true,
                         mensaje: 'Error al cargar la imagen',
                         severity: 'error'
                     }
                 })
             };
         } catch (error) {
             console.log(error)
         }        
       
    }
    const guardarUsuario = e => {
        e.preventDefault();
        actualizarUsuario(usuario, dispatch).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: 'OPEN_SNACKBAR',
                    openMensaje: {
                        open: true,
                        mensaje: "Se guardo exitosamente la informacion del usuario",
                        severity: 'success'
                    }
                })
                window.localStorage.setItem('id', response.data.usuarioId)
            } else {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Error al guardar la informacion del usuario\n Detalles del error : " + Object.values(response.response.data.errors),
                        severity: 'error'
                    }
                })
            }
        })


    }
    return (
        <Container component="main" maxWidth="md" justifyContent="center">
            <div style={style.paper}>
                <Avatar style={style.avatar} src={fotoUrl || reactFoto} />
                <Typography component="h1" variant="h5">
                    Perfil de Usuario
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={12}>
                            <TextField name="nombreCompleto" value={usuario.nombreCompleto} onChange={ingresarValores} variant="outlined" fullWidth label="Ingrese nombre y apellidos"></TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="userName" value={usuario.userName} onChange={ingresarValores} variant="outlined" fullWidth label="Ingrese nombre de usuario"></TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="email" value={usuario.email} onChange={ingresarValores} variant="outlined" fullWidth label="Ingrese email" type="email"></TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="password" value={usuario.password} onChange={ingresarValores} variant="outlined" fullWidth label="Ingrese contraseña" type="password"></TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="passwordConfirm" value={usuario.passwordConfirm} onChange={ingresarValores} variant="outlined" fullWidth label="Confirmar contraseña" type="password"></TextField>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <ImageUploader
                                withIcon={false}
                                singleImage={true}
                                buttonText="Seleccione una imagen de perfil"
                                onChange={subirFoto}
                                fileSizeError="El archivo es muy grande"
                                fileTypeError='La extension del archivo no es soportada'
                                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                maxFileSize={2242880}
                                label='Tamaño maximo del archivo: 2mb, formatos: jpg|gif|png|jpeg'
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit} onClick={guardarUsuario}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default PerfilUsuario;