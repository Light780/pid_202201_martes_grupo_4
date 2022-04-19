import { List, ListItem, ListItemText, Collapse, ListItemIcon } from '@material-ui/core';
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Build, ExpandLess, ExpandMore } from '@material-ui/icons';

export const LeftMenu = ({ classes, onClick }) => {
    const [open, setOpen] = useState({
        estadoColapsoMantenimiento : false
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleClick = (name) => {        
        setOpen(anterior => ({
            ...anterior,
            [name] : window.localStorage.getItem(name) === 'false'
        }));    
        window.localStorage.setItem(name,window.localStorage.getItem(name) === 'false')    
    };
    const handleListItemClick = (event, index) => {
        const name ="indiceMenu"
        setSelectedIndex(index);
        window.localStorage.setItem(name,index)    
        onClick()
    };
    useEffect(()=>{
        setOpen(({
            estadoColapsoMantenimiento: window.localStorage.getItem("estadoColapsoMantenimiento") === 'true' ?? false
        }))
        setSelectedIndex(Number(window.localStorage.getItem("indiceMenu")));
    },[])

    return (
        <div className={classes.list}>
            <List>
                <ListItem button onClick={() => handleClick("estadoColapsoMantenimiento")} selected={open.estadoColapsoMantenimiento}>
                    <Build color='black' className={classes.iconMenu}/>
                    <ListItemText classes={{ primary: classes.listItemText }} primary="Modulo Mantenimiento" />
                    {open.estadoColapsoMantenimiento ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open.estadoColapsoMantenimiento} timeout="auto" unmountOnExit>
                    <List component="div">
                        <ListItem component={Link} button to="/mantenimiento/departamento"
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}>
                            <i className='material-icons'>apartment</i>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Departamento" />
                        </ListItem>
                        <ListItem component={Link} selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)} button to='/mantenimiento/persona'>
                            <i className='material-icons'>person</i>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Persona" />
                        </ListItem>
                        <ListItem component={Link} selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)} button to='/mantenimiento/mascota'>
                            <i className='material-icons'>pets</i>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Mascota" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>

        </div>
    )
}