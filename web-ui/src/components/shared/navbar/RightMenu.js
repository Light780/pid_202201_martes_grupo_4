import { Avatar, Divider, List, ListItem, ListItemText} from '@material-ui/core'
import { Link } from 'react-router-dom'
import React from 'react'
import FotoUsuarioTemp from "../../../logo.svg";
export const RightMenu = ({ classes, usuario, closeSession }) => (
    <div className={classes.list}>
        <List>
            <ListItem button>
                <Avatar src={usuario.fotoPerfil || FotoUsuarioTemp} />
                <ListItemText classes={{ primary: classes.listItemText }} primary={usuario ? usuario.nombreCompleto : null} />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/auth/perfil">                             
                <ListItemText classes={{ primary: classes.listItemText }} primary="Perfil" />
            </ListItem>
            <ListItem button onClick={closeSession}>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Salir Sesion" />
            </ListItem>
        </List>
    </div>
)