import React, { useState } from 'react';
import { TextField, Container, Grid, Paper, Typography, Button } from '@mui/material';
import { generarBoletas } from '../../actions/BoletaAction';
import { useStateValue } from '../../context/store';
import useStyles, { style } from '../tools/style';
import SelectDepartamento from '../utils/SelectDepartamento';
import SelectParametro from '../utils/SelectParametro';
import { DatePicker } from '@mui/x-date-pickers';

function GenerarBoleta() {
    const styles = useStyles()
    const [{ sesionUsuario }, dispatch] = useStateValue()
    const [errors, setErrors] = useState({})
    const [boleta, setBoleta] = useState({
        servicioId: 0,
        departamentoId: 0,
        anio: null,
        monto: 0.00,
        usuarioId: sesionUsuario.usuario.usuarioId
    })

    const peticionPost = (e) => {
        e.preventDefault()
        const formErrors = validarForm(boleta)
        if (Object.keys(formErrors).length === 0) {
            generarBoletas(boleta).then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: 'OPEN_SNACKBAR',
                        openMensaje: {
                            open: true,
                            mensaje: "Boletas generadas correctamente",
                            severity: 'success'
                        }
                    })
                    limpiarForm()
                } else {
                    dispatch({
                        type: 'OPEN_SNACKBAR',
                        openMensaje: {
                            open: true,
                            mensaje: "Error al generar Boletas\n Detalles del error : " + Object.values(response.response.data.errors),
                            severity: 'error'
                        }
                    })
                }
            })
        }else{
            setErrors(formErrors)
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setBoleta(anterior => ({
            ...anterior,
            [name]: value
        }));
    }    
    const limpiarForm = () => {
        setBoleta({
            servicioId: 0,
            departamentoId: 0,
            anio: null,
            monto: 0.00,
            usuarioId: sesionUsuario.usuario.usuarioId
        })
        setErrors({})        
    }
    const validarForm = (boleta) => {
        const newErrors = {}
        if (boleta.servicioId === 0) {
            newErrors.servicioId = 'Debe seleccionar un servicio'
        }

        if (boleta.departamentoId === 0) {
            newErrors.departamentoId = 'Debe seleccionar un departamento'
        }

        if (boleta.monto === "") {
            newErrors.monto = "El monto es obligatorio"
        } else if (Number(boleta.monto) <= 0) {
            newErrors.monto = "El monto debe ser mayor a 0"
        }

        if (boleta.anio == null) {
            newErrors.anio = "El año es obligatorio"
        }        
        else if(boleta.anio.getFullYear().toString().length !== 4){
            newErrors.anio = "Debe ingresar un año valido"
        }
        else if(boleta.anio.getFullYear() <= 1999){
            newErrors.anio = "El minimo de año aceptable es de 2000 hacia adelante"
        }
        return newErrors;
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="md">
                <div className={styles.crud}>
                    <Paper>
                        <Paper className={styles.paperTitle}>
                            <Grid container justifyContent="flex-start">
                                <Typography component="h5" variant="h5" style={style.crudTitle}>
                                    Generar Boletas
                                </Typography>
                            </Grid>
                        </Paper>
                        <Paper className={styles.paperBody}>
                            <Container component="main" maxWidth="md" justifyContent="center">
                                <form className={styles.modalForm}>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={12} md={12}>
                                            <SelectParametro value={boleta.servicioId}
                                                label="Servicio"
                                                className={styles.inputMaterial}
                                                onChange={handleChange}
                                                name="servicioId"
                                                concepto="SERVICIO_ID"
                                                error={Boolean(errors?.servicioId)}
                                                errorMessage={(errors?.servicioId)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <SelectDepartamento value={boleta.departamentoId} error={Boolean(errors?.departamentoId)}
                                                errorMessage={(errors?.departamentoId)}
                                                name="departamentoId" className={styles.inputMaterial}
                                                onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField fullWidth
                                                label="Monto"
                                                name="monto"
                                                className={styles.inputMaterial}
                                                onChange={handleChange}
                                                value={boleta.monto}
                                                error={Boolean(errors?.monto)}
                                                helperText={(errors?.monto)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <DatePicker
                                                views={['year']}
                                                label="Año"
                                                value={boleta.anio}
                                                closeOnSelect={true}
                                                minDate={new Date("2001-01-01")}
                                                onChange={(e) => {
                                                    setBoleta((anterior) => ({
                                                        ...anterior,
                                                        anio: e
                                                    }))
                                                }}
                                                renderInput={(params) => <TextField {...params}
                                                    name="anio"
                                                    fullWidth                                                    
                                                    error={Boolean(errors?.anio)}
                                                    helperText={(errors?.anio)} />}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={12} md={12}>
                                            <Button type="submit" variant="contained"
                                                fullWidth
                                                size="large" color="primary" style={style.submit}
                                                onClick={peticionPost}>
                                                Generar
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

export default GenerarBoleta;