import { TextField, Container, Grid, Paper, Modal, Typography, Button, FormLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { listarPersona } from '../../actions/PersonaAction';
import { registrarVisita } from '../../actions/VisitaAction';
import { registrarPersona } from '../../actions/PersonaAction';
import { useStateValue } from '../../context/store';
import { useStyles, style } from '../tools/style'
import AutoCompletePersona from '../utils/AutoCompletePersona';
import SelectPersona from '../utils/SelectPersona';
import SelectParametro from '../utils/SelectParametro';
import SelectDepartamento from '../utils/SelectDepartamento';
import SelectSexo from '../utils/SelectSexo';

function RegistroVisita() {
    const styles = useStyles()
    const [{ sesionUsuario }, dispatch] = useStateValue()
    const [valueAutoComplete, setValueAutoComplete] = useState(null)
    const [personas, setPersonas] = useState([])
    const [errors, setErrors] = useState({})
    const [errores, setErrores] = useState({})
    const [modalInsertar, setModalInsertar] = useState(false);
    const [visitante, setVisitante] = useState('')
    const [visita, setVisita] = useState({
        personaVisitaId: 0,
        personaId: 0,
        fechaEntrada: ''
    });

    const [visitaForm, setVisitaForm] = useState({
        personaId: 0,
        nombreCompleto: '',
        documento: '',
        tipoDocumentoId: 0,
        telefono: '',
        estadoId: 0,
        correo: '',
        sexo: '',
        tipoPersonaId: 3,
        departamentoId: 0
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


    const peticionPostForm = (e) => {
        e.preventDefault()
        //validarFormVisita(visitaForm)
        if (Object.keys(errors).length === 0) {
            registrarPersona(visitaForm).then(respuesta => {
                if (respuesta.status === 200) {
                    dispatch({
                        type: 'OPEN_SNACKBAR',
                        openMensaje: {
                            open: true,
                            mensaje: "Visitante registrado correctamente",
                            severity: 'success'
                        }
                    })
                    limpiarForm()
                    abrirCerrarModalInsertar()
                    listarPersonas()
                } else {
                    dispatch({
                        type: 'OPEN_SNACKBAR',
                        openMensaje: {
                            open: true,
                            mensaje: "Error al registrar Visitante\n Detalles del error : " + Object.values(respuesta.response.data.errors),
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

    const handleChangeForm = (e) => {
        const { name, value } = e.target
        setVisitaForm((anterior) => ({
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

    const limpiarForm = () => {
        setVisitaForm({
           personaId: 0,
           nombreCompleto: '',
           documento: '',
           tipoDocumentoId: 0,
           telefono: '',
           estadoId: 0,
           correo: '',
           sexo: '',
           tipoPersonaId: 0,
           departamentoId: 0
        })
        setErrores({})
        //setValueAutoComplete(null)
     }

    const abrirCerrarModalInsertar = () => {
        limpiarForm()
        setModalInsertar(!modalInsertar);
     }

    useEffect(() => {
        setInterval(clock, 1000);
        listarPersonas();
    }, []);


    //? Modal registrar visita

    const bodyInsertar = (
        <div className={styles.modal}>
        <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Registrar Visitante</Typography>
            <form className={styles.modalForm}>
                <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={12}>
                    <TextField name="nombreCompleto" error={Boolean(errores?.nombreCompleto)} helperText={(errores?.nombreCompleto)}
                        className={styles.inputMaterial} label="Nombre Completo" onChange={handleChangeForm}
                        value={visitaForm.nombreCompleto} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField name="documento" error={Boolean(errores?.documento)} helperText={(errores?.documento)}
                        className={styles.inputMaterial} label="Documento" onChange={handleChangeForm}
                        value={visitaForm.documento} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectParametro concepto="TIPO_DOCUMENTO_PERSONA" error={Boolean(errores?.tipoDocumentoId)}
                        errorMessage={(errores?.tipoDocumentoId)} name="tipoDocumentoId"
                        className={styles.inputMaterial} value={visitaForm.tipoDocumentoId}
                        label="Tipo Documento" onChange={handleChangeForm}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField name="telefono" error={Boolean(errores?.telefono)} helperText={(errores?.telefono)}
                        className={styles.inputMaterial} label="Telefono" onChange={handleChangeForm}
                        value={visitaForm.telefono} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectParametro concepto="ESTADO_ID" error={Boolean(errores?.estadoId)}
                        errorMessage={(errores?.estadoId)} name="estadoId"
                        className={styles.inputMaterial} value={visitaForm.estadoId}
                        label="Estado" onChange={handleChangeForm}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField name="correo" error={Boolean(errores?.correo)} helperText={(errores?.correo)}
                        className={styles.inputMaterial} label="Correo" onChange={handleChangeForm}
                        value={visitaForm.correo} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectSexo value={visitaForm.sexo} error={Boolean(errores?.sexo)}
                        errorMessage={(errores?.sexo)}
                        name="sexo" className={styles.inputMaterial}
                        onChange={handleChangeForm} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectParametro concepto="TIPO_PERSONA_ID" error={Boolean(errores?.tipoPersonaId)}
                        errorMessage={(errores?.tipoPersonaId)} name="tipoPersonaId"
                        className={styles.inputMaterial} value={visitaForm.tipoPersonaId = 3}
                        label="Tipo Persona" onChange={handleChangeForm} disabled
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectDepartamento value={visitaForm.departamentoId} error={Boolean(errores?.departamentoId)}
                        errorMessage={(errores?.departamentoId)}
                        name="departamentoId" className={styles.inputMaterial}
                        onChange={handleChangeForm} />
                </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center">
                <Grid item xs={6} md={6}>
                    <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit} onClick={peticionPostForm}>
                        Guardar
                    </Button>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Button type="button" fullWidth variant="contained" size="large" color="secondary" style={style.submit} onClick={abrirCerrarModalInsertar}>Cancelar</Button>
                </Grid>
                </Grid>
            </form>
        </Container>
    </div>
    )

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
                                                <Button type="button" style={style.submit} fullWidth variant="contained" size="large" color="secondary"
                                                onClick={abrirCerrarModalInsertar}
                                                >
                                                Registrar Visitante</Button>
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
                                            <FormLabel class="lblHora">Fecha y Hora de Entrada</FormLabel>
                                            <TextField fullWidth                                                
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
            <Modal
            open={modalInsertar}
            onClose={(event, reason) => {
               if (reason !== 'backdropClick') {
                  abrirCerrarModalInsertar();
               }
            }}>
            {bodyInsertar}
         </Modal>
        </React.Fragment>
    );
};

export default RegistroVisita;