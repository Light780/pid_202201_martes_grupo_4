import { Avatar, Divider, List, ListItem, ListItemText } from '@material-ui/core'
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
            <ListItem button onClick={closeSession}>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Salir Sesion" />
            </ListItem>
        </List>
    </div>
)