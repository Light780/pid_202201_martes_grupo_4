import React, { useState } from "react";
import {
  TextField,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { actualizarIncidencia, consultarUnico } from "../../actions/IncidenciaAction";
import { useStateValue } from "../../context/store";
import useStyles, { style } from "../tools/style";
import SelectParametro from "../utils/SelectParametro";
import SelectDepartamento from "../utils/SelectDepartamento";
import SelectPersona from "../utils/SelectPersona";
import { DatePicker } from "@mui/x-date-pickers";

function ActualizarIncidencia() {
  const styles = useStyles();
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [errors, setErrors] = useState({});
  const [incidencia, setIncidencia] = useState({
    incidenciaId: 0,
    departamentoId: 0,
    tipoIncidenciaId: 0,
    descripcionIncidencia: "",
    personaId: 0,
    fechaIncidencia: "",
    /*estadoIncidenciaId: 0,
    usuarioId: sesionUsuario.usuario.usuarioId,*/
  });


  const peticionUnico = async (incidencia) => {
    await consultarUnico(incidencia.incidenciaId).then(respuesta => {
       if (respuesta.status === 200) {
          setIncidencia(respuesta.data)
       } else {
          dispatch({
             type: 'OPEN_SNACKBAR',
             openMensaje: {
                open: true,
                mensaje: "Error al consultar la Incidencia",
                severity: 'error'
             }
          })
       }
    })
 }

  const peticionPut = (e) => {
    e.preventDefault();
    const formErrors = validarForm(incidencia);
    if (Object.keys(formErrors).length === 0) {
      actualizarIncidencia(incidencia).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: "Incidencia actualizada correctamente.",
              severity: "success",
            },
          });
          limpiarForm();
        } else {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje:
                "Error al actualizar la incidencia\n Detalle del error : " +
                Object.values(response.response.data.errors),
              severity: "error",
            },
          });
        }
      });
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncidencia((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const limpiarForm = () => {
    setIncidencia({
      incidenciaId: 0,
      departamentoId: 0,
      tipoIncidenciaId: 0,
      descripcionIncidencia: "",
      personaId: 0,
      fechaIncidencia: "",
     /* estadoIncidenciaId: 0,
      usuarioId: sesionUsuario.usuario.usuarioId,*/
    });
  };

  const validarForm = (incidencia) => {
    const newErrors = {};
    if (incidencia.departamentoId === 0) {
      newErrors.departamentoId = "Debe seleccionar un departamento.";
    }

    if (incidencia.tipoIncidenciaId === 0) {
      newErrors.tipoIncidenciaId = "Debe seleccionar un tipo de incidencia.";
    }

    if (incidencia.descripcionIncidencia === "") {
      newErrors.descripcionIncidencia = "El descripción de la incidencia es obligatoria.";
    }else if(incidencia.descripcionIncidencia.length < 10){
      newErrors.descripcionIncidencia = "La descripción debe tener al menos 10 caracteres.";
    }

    if (incidencia.personaId === 0) {
      newErrors.personaId = "Debe seleccionar una persona.";
    }

    if (incidencia.fechaIncidencia === null || incidencia.fechaIncidencia === "") {
      newErrors.fechaIncidencia = "La fecha de la incidencia es obligatoria.";
    }
    return newErrors;
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md">
        <div className={styles.crud}>
          <Paper>
            <Paper className={styles.paperTitle}>
              <Grid container justifyContent="flex-start">
                <Typography component="h5" variant="h5" style={style.crudTitle}>
                  Actualizar Incidencia
                </Typography>
              </Grid>
            </Paper>
            <Paper className={styles.paperBody}>
              <Container component="main" maxWidth="md" justifyContent="center">
                <form className={styles.modalForm}>
                  <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <TextField name="incidenciaId" className={styles.inputMaterial} label="incidenciaId" onChange={handleChange} value={incidencia.incidenciaId}></TextField>
                  </Grid>
                    <Grid item xd={12} md={12}>
                      <SelectDepartamento
                        value={incidencia.departamentoId}
                        label="Departamento"
                        className={styles.inputMaterial}
                        onChange={handleChange}
                        name="departamentoId"
                        error={Boolean(errors?.departamentoId)}
                        errorMessage={errors?.departamentoId}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <SelectParametro
                        value={incidencia.tipoIncidenciaId}
                        label="Tipo Incidencia"
                        className={styles.inputMaterial}
                        onChange={handleChange}
                        name="tipoIncidenciaId"
                        concepto="TIPO_INCIDENCIA_ID"
                        error={Boolean(errors?.tipoIncidenciaId)}
                        errorMessage={errors?.tipoIncidenciaId}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        multiline
                        label="Descripción"
                        name="descripcionIncidencia"
                        className={styles.inputMaterial}
                        onChange={handleChange}
                        value={incidencia.descripcionIncidencia}
                        error={Boolean(errors?.descripcionIncidencia)}
                        helperText={errors?.descripcionIncidencia}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <SelectPersona
                        value={incidencia.personaId}
                        label="Informante"
                        className={styles.inputMaterial}
                        onChange={handleChange}
                        name="personaId"
                        error={Boolean(errors?.personaId)}
                        errorMessage={errors?.personaId}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <DatePicker
                        label="Fecha incidencia"
                        value={incidencia.fechaIncidencia}
                        inputFormat="dd/MM/yyyy HH:mm"
                        mask="__/__/____ __:__"
                        onChange={(e) => {
                          setIncidencia((anterior) => ({
                            ...anterior,
                            fechaIncidencia: e,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="fechaIncidencia"
                            fullWidth
                            error={Boolean(errors?.fechaIncidencia)}
                            helperText={errors?.fechaIncidencia}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        color="primary"
                        style={style.submit}
                        onClick={peticionPut}
                      >
                        Actualizar
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
}

export default ActualizarIncidencia;
