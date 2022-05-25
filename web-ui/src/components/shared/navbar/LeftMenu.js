import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Build, ExpandLess, ExpandMore, People } from '@mui/icons-material';

export const LeftMenu = ({ classes, onClick }) => {
    const [open, setOpen] = useState({
        estadoColapsoMantenimiento: false,
        estadoColapsoVisitas: false
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleClick = (name) => {
        let localStorageJson = JSON.parse(window.localStorage.getItem("open")) ?? open
        let nuevoBoolean = localStorageJson[name] === false
        setOpen(anterior => ({
            ...anterior,
            [name]: nuevoBoolean
        }));
        localStorageJson[name] = nuevoBoolean
        window.localStorage.setItem("open", JSON.stringify(localStorageJson))
    };
    const handleListItemClick = (event, index) => {
        const name = "indiceMenu"
        setSelectedIndex(index);
        window.localStorage.setItem(name, index)
        onClick()
    };
    useEffect(() => {
        setOpen(JSON.parse(window.localStorage.getItem("open")) ?? open)
        setSelectedIndex(Number(window.localStorage.getItem("indiceMenu")));
    }, [])

    return (
        <div className={classes.list}>
            <List>
                <ListItem button onClick={() => handleClick("estadoColapsoMantenimiento")} selected={open.estadoColapsoMantenimiento}>
                    <Build color='black' className={classes.iconMenu} />
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
                        {/* <ListItem component={Link} selected={selectedIndex === 4}
                            onClick={(event) => handleListItemClick(event, 4)} button to='/mantenimiento/prueba'>
                            <i className='material-icons'>pets</i>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Prueba" />
                        </ListItem> */}
                    </List>
                </Collapse>

                <ListItem button onClick={() => handleClick("estadoColapsoVisitas")} selected={open.estadoColapsoVisitas}>
                    <People color='black' className={classes.iconMenu} />
                    <ListItemText classes={{ primary: classes.listItemText }} primary="Modulo Visita" />
                    {open.estadoColapsoVisitas ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open.estadoColapsoVisitas} timeout="auto" unmountOnExit>
                    <List component="div">
                        <ListItem component={Link} button to="/visita/registro"
                            selected={selectedIndex === 5}
                            onClick={(event) => handleListItemClick(event, 5)}>
                            <i className='material-icons'>emoji_people</i>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Registro" />
                        </ListItem>
                        {/* Mbarreto - 10.05.2022 */}
                        <ListItem component={Link} button to="/visita/ConsultaVisita"
                        selected={selectedIndex === 6}
                        onClick={(event) => handleListItemClick(event, 6)}>
                            <i className='material-icons'>emoji_people</i>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Consulta" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>

        </div>
    )
}