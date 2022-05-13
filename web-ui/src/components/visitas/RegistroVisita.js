import { TextField, Container, Grid, Paper, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../context/store';
import { useStyles, style } from '../tools/style'
import AutoCompletePersona from '../utils/AutoCompletePersona';
import SelectPersona from '../utils/SelectPersona';

function RegistroVisita() {
    const styles = useStyles();    
    const [visitante, setVisitante] = useState('')    
    const [visita, setVisita] = useState({
        personaVisitaId: 0,
        personaId: 0,
        fechaEntrada: ''
    });
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
        if(selectedPersona != null){
            setVisita((anterior) => ({
                ...anterior,
                personaVisitaId: selectedPersona.personaId
            }))            
            setVisitante(selectedPersona.nombreCompleto)
        }else{
            setVisita((anterior) => ({
                ...anterior,
                personaVisitaId: 0
            }))            
            setVisitante('')
        }
        
    }
    useEffect(() => {
        setInterval(clock, 1000)
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
                                            label="Documento"                                            
                                            className={styles.inputMaterial}
                                            />
                                        </Grid>
                                        <Grid item container spacing={2} xs={6} md={6}>                                            
                                            <Grid item xs={6} md={6}>
                                                <Button type="button" style={style.submit} fullWidth variant="contained" size="large" color="secondary">Registrar</Button>
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
                                            <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit}>
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