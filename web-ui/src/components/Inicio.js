import { Apartment, EmojiPeople, Person, Pets, Receipt } from '@mui/icons-material';
import { Grid } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import React, { useEffect, useState } from 'react';
import { consultarCantidades } from '../actions/UtilsAction';
import { useStateValue } from '../context/store';
import { useStyles } from './tools/style'
import Cards from './utils/Cards';
const Inicio = () => {
    const styles = useStyles();
    const [{ sesionUsuario }, dispatch] = useStateValue()
    const [dashboard, setDashboard] = useState([])
    const peticionGet = () => {
        consultarCantidades().then(response => {
            if (response.status === 200) {
                setDashboard(response.data)
            } else {
                dispatch({
                    type: 'OPEN_SNACKBAR',
                    openMensaje: {
                        open: true,
                        mensaje: 'Error al consultar',
                        severity: 'error'
                    }
                })
            }
        })
    }

    useEffect(() => {
        peticionGet();
    }, [])

    return (
        <div className={styles.grow}>

            <Grid container spacing={3} className={styles.container}>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<Apartment className={styles.iconCard} />}
                        titulo="Departamentos"
                        texto={dashboard.cantDepartamentos}
                        color="gray"
                        fontColor="white" 
                        link = "/mantenimiento/departamento"/>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<Person className={styles.iconCard} />}
                        titulo="Personas"
                        texto={dashboard.cantPersonas}
                        color="red"
                        fontColor="white" 
                        link = "/mantenimiento/persona"/>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<Pets className={styles.iconCard} />}
                        titulo="Mascotas"
                        texto={dashboard.cantMascotas}
                        color="green"
                        fontColor="white" 
                        link = "/mantenimiento/mascota"/>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<EmojiPeople className={styles.iconCard} />}
                        titulo="Visitas"
                        texto={dashboard.cantVisitas}
                        color="orange"
                        fontColor="white" 
                        link = "/visita/consultaVisita"/>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<Receipt className={styles.iconCard} />}
                        titulo="Boletas"
                        texto={dashboard.cantBoletas}
                        color="skyblue"
                        fontColor="white" 
                        link = "/servicio/consultarBoleta"/>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<ReportProblemIcon className={styles.iconCard} />}
                        titulo="Incidencias"
                        texto={dashboard.cantIncidencias}
                        color="darkorange"
                        fontColor="white" 
                        link = "/incidencia/consultarIncidencia"/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Inicio;