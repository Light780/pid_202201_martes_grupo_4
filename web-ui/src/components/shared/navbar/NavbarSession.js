import { Button, Drawer, IconButton, Toolbar, Typography, Avatar, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FotoUsuarioTemp from "../../../logo.svg";
import { LeftMenu } from './LeftMenu';
import { RightMenu } from './RightMenu';
import { useStateValue } from '../../../context/store';
import { blobConverter } from '../../../services/Utils';
const useStyles = makeStyles((theme) => ({
    seccionDesktop: {
        display: 'none',
        [theme.breakpoints.up("md")]: {
            display: 'flex'
        }
    },
    seccionMobil: {
        display: 'flex',
        [theme.breakpoints.up("md")]: {
            display: 'none'
        }
    },
    grow: {
        flexGrow: 1,

    },
    avatarSize: {
        width: 40,
        height: 40
    },
    list: {
        width: 250
    },
    listItemText: {
        fontSize: '14px',
        fontWeight: 600,
        paddingLeft: "15px",
        color: "#212121"
    }
}))
function NavbarSession() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [{sesionUsuario, openSnackBar}, dispatch] = useStateValue();
    const [openLeftMenu, setOpenLeftMenu] = useState(false)
    const [openRightMenu, setOpenRightMenu] = useState(false)        
    const openCloseLeftMenu = () => {
        setOpenLeftMenu(!openLeftMenu)
    }
    const openCloseRightMenu = () => {
        setOpenRightMenu(!openRightMenu)
    }
    const closeSession = () => {
        window.localStorage.removeItem('token_seguridad');
        dispatch({
            type: "SALIR_SESION",
            nuevoUsuario: null,
            autenticado: false
        })
        navigate('/auth/login')
    }
    return (
        <React.Fragment>
            <Drawer open={openLeftMenu} onClose={openCloseLeftMenu} anchor="left">
                <div className={classes.list} onKeyDown={openCloseLeftMenu} onClick={openCloseLeftMenu}>
                    <LeftMenu classes={classes} />
                </div>
            </Drawer>
            <Drawer open={openRightMenu} onClose={openCloseRightMenu} anchor="right">
                <div role="button" onKeyDown={openCloseRightMenu} onClick={openCloseRightMenu}>
                    <RightMenu classes={classes} closeSession={closeSession} usuario={sesionUsuario.usuario} />
                </div>
            </Drawer>
            <Toolbar>
                <IconButton color="inherit" onClick={openCloseLeftMenu}>
                    <i className="material-icons">menu</i>
                </IconButton>
                <Typography variant="h6">Gestion de Departamentos</Typography>
                <div className={classes.grow}></div>

                <div className={classes.seccionDesktop}>
                    <Button color="inherit" onClick={closeSession}>
                        Salir Sesion
                    </Button>
                    <Button color="inherit" onClick={openCloseRightMenu}>
                        {sesionUsuario ? sesionUsuario.usuario.nombreCompleto : ""}
                    </Button>
                    <Avatar src={blobConverter(sesionUsuario.usuario.fotoPerfil) || FotoUsuarioTemp}></Avatar>
                </div>
                <div className={classes.seccionMobil}>
                    <IconButton color="inherit" onClick={openCloseRightMenu}>
                        <i className='material-icons'>more_vert</i>
                    </IconButton>
                </div>
            </Toolbar>
        </React.Fragment>
    );
};

export default NavbarSession;