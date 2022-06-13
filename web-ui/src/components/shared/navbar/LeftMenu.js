import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Build, ExpandLess, ExpandMore, MiscellaneousServices, People, ReportProblem } from '@mui/icons-material';

export const LeftMenu = ({ classes, onClick }) => {
    const [open, setOpen] = useState({
        estadoColapsoMantenimiento: false,
        estadoColapsoVisitas: false,
        estadoColapsoBoletas: false,
        estadoColapsoIncidencias: false
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
                <ListItem component={Link} button to="/"
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}>
                    <i className='material-icons'>home</i>
                    <ListItemText classes={{ primary: classes.listItemText }} primary="Dashboard" />
                </ListItem>
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
                        <ListItem component={Link} button to="/visita/consultaVisita"
                            selected={selectedIndex === 6}
                            onClick={(event) => handleListItemClick(event, 6)}>
                            <i className='material-icons'>emoji_people</i>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Consulta" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button onClick={() => handleClick("estadoColapsoBoletas")} selected={open.estadoColapsoBoletas}>
                    <MiscellaneousServices color='black' className={classes.iconMenu} />
                    <ListItemText classes={{ primary: classes.listItemText }} primary="Modulo Servicios" />
                    {open.estadoColapsoBoletas ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open.estadoColapsoBoletas} timeout="auto" unmountOnExit>
                    <List component="div">
                        <ListItem component={Link} button to="/servicio/generarBoletas"
                            selected={selectedIndex === 7}
                            onClick={(event) => handleListItemClick(event, 7)}>
                            <i className='material-icons'>receipt</i>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Generar Boletas" />
                        </ListItem>
                        <ListItem component={Link} button to="/servicio/consultarBoletas"
                            selected={selectedIndex === 8}
                            onClick={(event) => handleListItemClick(event, 8)}>
                            <i className='material-icons'>description</i>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Consultar Boletas" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button onClick={() => handleClick("estadoColapsoIncidencias")} selected={open.estadoColapsoIncidencias}>
                    <ReportProblem color='black' className={classes.iconMenu} />
                    <ListItemText classes={{ primary: classes.listItemText }} primary="Modulo Incidencias" />
                    {open.estadoColapsoIncidencias ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open.estadoColapsoIncidencias} timeout="auto" unmountOnExit>
                    <List component="div">
                        <ListItem component={Link} button to="/incidencia/registrarIncidencia"
                            selected={selectedIndex === 9}
                            onClick={(event) => handleListItemClick(event, 9)}>
                            <i className='material-icons'>report_problem</i>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Mantenimiento Incidencia" />
                        </ListItem>                        
                        <ListItem component={Link} button to="/incidencia/consultarHIncidencia"
                        selected={selectedIndex === 10}
                        onClick={(event) => handleListItemClick(event, 11)}>
                            <i className='material-icons'>timeline</i>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Consultar Historial Incidencia" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>

        </div>
    )
}