import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom'
import React from 'react'

export const LeftMenu = ({classes}) => (
    <div className={classes.list}>        
        <List>
            <ListItem component={Link} button to="/mantenimiento/departamento">
                <i className='material-icons'>apartment</i>                
                <ListItemText classes={{ primary: classes.listItemText }} primary="Departamento" />
            </ListItem>
            <ListItem component={Link} button to='/mantenimiento/propietario'>
                <i className='material-icons'>person</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Propietarios" />
            </ListItem>
            <ListItem component={Link} button to='/mantenimiento/mascota'>
                <i className='material-icons'>pets</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Mascota" />
            </ListItem>                              
        </List>        
    </div>
)