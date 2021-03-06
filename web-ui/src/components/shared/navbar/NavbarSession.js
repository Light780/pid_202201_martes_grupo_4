import { Button, Drawer, IconButton, Toolbar, Typography, Avatar} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FotoUsuarioTemp from "../../../logo.svg";
import { LeftMenu } from './LeftMenu';
import { RightMenu } from './RightMenu';
import { useStateValue } from '../../../context/store';
import { blobConverter } from '../../../services/Utils';
import useStyles from '../../tools/style';
import { cerrarSesion } from '../../../actions/UsuarioAction';

function NavbarSession() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [{ sesionUsuario, openSnackBar }, dispatch] = useStateValue();
    const [openLeftMenu, setOpenLeftMenu] = useState(false)
    const [openRightMenu, setOpenRightMenu] = useState(false)
    const openCloseLeftMenu = () => {
        setOpenLeftMenu(!openLeftMenu)
    }
    const openCloseRightMenu = () => {
        setOpenRightMenu(!openRightMenu)
    }
    const closeSession = () => {        
        window.localStorage.removeItem('open');
        window.localStorage.removeItem('indiceMenu');
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
                <div className={classes.list} onKeyDown={openCloseLeftMenu}>
                    <LeftMenu classes={classes} onClick={openCloseLeftMenu} />
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
                <Typography variant="h6">Gesti??n de Departamentos</Typography>
                <div className={classes.grow}></div>

                <div className={classes.seccionDesktop}>
                    <Button color="inherit" onClick={closeSession}>
                        Cerrar Sesi??n
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