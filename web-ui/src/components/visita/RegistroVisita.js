import { TextField, Container, Grid, Paper, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { listarPersona } from '../../actions/PersonaAction';
import { registrarVisita } from '../../actions/VisitaAction';
import { useStateValue } from '../../context/store';
import { useStyles, style } from '../tools/style'
import AutoCompletePersona from '../utils/AutoCompletePersona';
import SelectPersona from '../utils/SelectPersona';

function RegistroVisita() {
    const styles = useStyles()
    const [{ sesionUsuario }, dispatch] = useStateValue()
    const [valueAutoComplete, setValueAutoComplete] = useState(null)
    const [personas, setPersonas] = useState([])
    const [errors, setErrors] = useState({})
    const [visitante, setVisitante] = useState('')
    const [visita, setVisita] = useState({
        personaVisitaId: 0,
        personaId: 0,
        fechaEntrada: ''
    });
    const listarPersonas = () => {
        listarPersona({
            filtroDepartamentoId: 0,
            filtroTipoPersonaId: 3,
            filtroEliminado: 0
        }).then(respuesta => {
            let arrayPersona = []
            respuesta.data.map(persona => arrayPersona.push({ personaId: persona.personaId, nombreCompleto: persona.nombreCompleto, documento: persona.documento }))
            setPersonas(arrayPersona);            
        })
    }
    const validarFormVisita = (visita) => {
        const newErrors = { ...errors }
        if (visita.personaVisitaId === 0) {
            newErrors.personaVisitaId = 'Debe seleccionar un visitante'
        } else {
            delete newErrors.personaVisitaId
        }
        if (visita.personaId === 0) {
            newErrors.personaId = 'Debe seleccionar un anfitrion'
        } else {
            delete newErrors.personaId
        }
        setErrors(newErrors);
    }
    const peticionPost = (e) => {
        e.preventDefault()
        validarFormVisita(visita)
        if (Object.keys(errors).length === 0) {
            registrarVisita(visita).then(respuesta => {
                if (respuesta.status === 200) {
                    dispatch({
                        type: 'OPEN_SNACKBAR',
                        openMensaje: {
                            open: true,
                            mensaje: "Visita registrada correctamente",
                            severity: 'success'
                        }
                    })
                    limpiarFormVisita()
                } else {
                    dispatch({
                        type: 'OPEN_SNACKBAR',
                        openMensaje: {
                            open: true,
                            mensaje: "Error al registrar Visita\n Detalles del error : " + Object.values(respuesta.response.data.errors),
                            severity: 'error'
                        }
                    })
                }
            })
        }
    }
    const limpiarFormVisita = () => {
        setVisita({
            personaVisitaId: 0,
            personaId: 0,
            fechaEntrada: ''
        })
        setVisitante('')
        setValueAutoComplete(null)
    }
    const clock = () => {
        const date = new Date();
        const h = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        setVisita((anterior) => ({
            ...anterior,
            horaEntrada: h
        }));
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setVisita((anterior) => ({
            ...anterior,
            [name]: value
        }))
    }
    const autoCompleteChange = (selectedPersona) => {
        if (selectedPersona != null) {
            setVisita((anterior) => ({
                ...anterior,
                personaVisitaId: selectedPersona.personaId
            }))
            setVisitante(selectedPersona.nombreCompleto)
        } else {
            setVisita((anterior) => ({
                ...anterior,
                personaVisitaId: 0
            }))
            setVisitante('')
        }

    }
    useEffect(() => {
        setInterval(clock, 1000);
        listarPersonas();
    }, []);
    return (
        <React.Fragment>
            <Container component="main" maxWidth="md">
                <div className={styles.crud}>
                    <Paper>
                        <Paper className={styles.paperTitle}>
                            <Grid container justifyContent="flex-start">
                                <Typography component="h5" variant="h5" style={style.crudTitle}>
                                    Registro de Visita
                                </Typography>
                            </Grid>
                        </Paper>
                        <Paper className={styles.paperBody}>
                            <Container component="main" maxWidth="md" justifyContent="center">
                                <form className={styles.modalForm}>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={6} md={6}>
                                            <AutoCompletePersona
                                                onChange={(event, selectedValue) => autoCompleteChange(selectedValue)}
                                                options={personas}
                                                value={valueAutoComplete}                                                
                                                label="Documento"                                                
                                                className={styles.inputMaterial}
                                                error={Boolean(errors?.personaVisitaId)} 
                                                errorMessage={(errors?.personaVisitaId)}
                                            />
                                        </Grid>
                                        <Grid item container spacing={2} xs={6} md={6}>
                                            <Grid item xs={12} md={12}>
                                                <Button type="button" style={style.submit} fullWidth variant="contained" size="large" color="secondary">Registrar Visitante</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <TextField fullWidth
                                                label="Visitante"
                                                className={styles.inputMaterial}
                                                disabled={true}
                                                value={visitante}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <SelectPersona value={visita.personaId}
                                                label="Visita A"
                                                className={styles.inputMaterial}
                                                onChange={handleChange}
                                                name="personaId"
                                                error={Boolean(errors?.personaId)}
                                                errorMessage={(errors?.personaVisitaId)}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <TextField fullWidth
                                                label="Fecha y Hora de Ingreso"
                                                aria-readonly="true"
                                                value={visita.horaEntrada}
                                                disabled={true}
                                                InputProps={{
                                                    inputProps: {
                                                        style: { textAlign: "center" }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={6} md={6}>
                                            <Button type="submit" fullWidth variant="contained" 
                                                size="large" color="primary" style={style.submit} 
                                                onClick={ (e) => {peticionPost(e)}}>
                                                Registrar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Container>
                        </Paper>
                    </Paper>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default RegistroVisita;