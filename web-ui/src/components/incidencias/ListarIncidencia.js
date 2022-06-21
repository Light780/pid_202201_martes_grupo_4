import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  Button,
  Container,
  TextField,
  Typography,
  Modal,
  TableContainer,
  TableHead,
  TablePagination,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Stack,
  FormControlLabel,
} from "@mui/material";
import { Edit, Delete} from "@mui/icons-material";
import { useStyles, style } from "../tools/style";
import {
  listarIncidencia,
  actualizarIncidencia,
  consultarUnico,
} from "../../actions/IncidenciaAction";
import SelectDepartamento from "../utils/SelectDepartamento";
import SelectParametro from "../utils/SelectParametro";
import { useStateValue } from "../../context/store";
import { DatePicker } from "@mui/x-date-pickers";
import SelectPersona from "../utils/SelectPersona";
import { listarHistorialIncidencia } from "../../actions/HistorialIncidenciaAction";
import { borrarIncidencia} from "../../actions/IncidenciaAction";

function ListarIncidencia() {
  const styles = useStyles();
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listaHistorialIncidencia, setListaHistorial] = useState([]);
  const [listaIncidencia, setListaIncidencia] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAtender, setModalAtender] = useState(false);
  const [modalHistorialIncidencia, setModalHistorialIncidencia] =
    useState(false);
  const [errors, setErrors] = useState({});
  const [incidencia, setIncidencia] = useState({
    //! Atributos de entity Dto

    incidenciaId: 0,
    departamentoId: 0,
    tipoIncidenciaId: 0,
    descripcionIncidencia: "",
    personaId: 0,
    fechaIncidencia: "",
    estadoIncidenciaId: 2,
    usuarioId: sesionUsuario.usuario.usuarioId,
  });

  const handleChangeFiltro = (e) => {
    const { name, value } = e.target;
    setFiltro((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const [filtro, setFiltro] = useState({
    filtroDepartamentoId: 0,
    filtroTipoIncidenciaId: 0,
    filtroEstadoIncidenciaId: 0,
    filtroEliminado: 0
  });

  const [checkFiltro, setCheckFiltro] = useState({
    filtroDepartamentoId: false,
    filtroTipoIncidenciaId: false,
    filtroEstadoIncidenciaId: false,
    filtroEliminado: false
  });

   
   const [modalEliminar, setModalEliminar] = useState(false);

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalHistorialIncidencia = () => {
    setModalHistorialIncidencia(!modalHistorialIncidencia);
  };

  const abrirCerrarModalAtender = () => {
    setModalAtender(!modalAtender);
  };

  const handleCheckFiltro = (e) => {
    const { name, value } = e.target;
    setCheckFiltro((anterior) => ({
      ...anterior,
      [name]: value === "false",
    }));
    if (value === "true") {
      setFiltro((anterior) => ({
        ...anterior,
        [name]: 0,
      }));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, listaIncidencia.length - page * rowsPerPage);

  const peticionGet = () => {
    listarIncidencia(filtro).then((respuesta) => {
      if (respuesta.status === 200) {
        setListaIncidencia(respuesta.data);
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Error al listar Incidencias",
            severity: "error",
          },
        });
      }
    });
  };

  const peticionPut = (e) => {
    e.preventDefault();
    incidencia.usuarioId = sesionUsuario.usuario.usuarioId;
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
          peticionGet();
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

  const peticionUnico = async (incidencia) => {
    await consultarUnico(incidencia.incidenciaId).then((respuesta) => {
      if (respuesta.status === 200) {
        setIncidencia(respuesta.data);
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Error al consultar la Incidencia",
            severity: "error",
          },
        });
      }
    });
  };

  const peticionDelete = e => {
    e.preventDefault()
    borrarIncidencia(incidencia.incidenciaId).then(respuesta => {
       let mensaje;
       if (respuesta.status === 200) {
          mensaje = "Incidencia "+ (incidencia.eliminado ? "activada" : "eliminada") +" correctamente"
          dispatch({
             type: 'OPEN_SNACKBAR',
             openMensaje: {
                open: true,
                mensaje: mensaje,
                severity: 'success'
             }
          })
          abrirCerrarModalEliminar()
          limpiarForm()
          peticionGet()
       } else {
          mensaje = "Error al "+ (incidencia.eliminado ? "activar" : "eliminar") + " la incidencia"
          dispatch({
             type: 'OPEN_SNACKBAR',
             openMensaje: {
                open: true,
                mensaje: mensaje,
                severity: 'error'
             }
          })
       }
    })

 }

  const peticionGetHistorial = async (incidencia) => {
    await listarHistorialIncidencia(incidencia.incidenciaId).then(
      (respuesta) => {
        if (respuesta.status === 200) {
          setListaHistorial(respuesta.data);
        } else {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: "Error al listar Historial de Incidencias",
              severity: "error",
            },
          });
        }
      }
    );
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
      newErrors.descripcionIncidencia =
        "El descripción de la incidencia es obligatoria.";
    } else if (incidencia.descripcionIncidencia.length < 10) {
      newErrors.descripcionIncidencia =
        "La descripción debe tener al menos 10 caracteres.";
    }

    if (incidencia.personaId === 0) {
      newErrors.personaId = "Debe seleccionar una persona.";
    }

    if (
      incidencia.fechaIncidencia === null ||
      incidencia.fechaIncidencia === ""
    ) {
      newErrors.fechaIncidencia = "La fecha de la incidencia es obligatoria.";
    }
    return newErrors;
  };

  const limpiarForm = () => {
    setIncidencia({
      incidenciaId: 0,
      departamentoId: 0,
      tipoIncidenciaId: 0,
      descripcionIncidencia: "",
      personaId: 0,
      fechaIncidencia: "",
      /* estadoIncidenciaId: 0,*/
      usuarioId: sesionUsuario.usuario.usuarioId,
    });
  };

 
 const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
 }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncidencia((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  let styleEstadoIncidencia = (estado) => {
    let colorEstado;
    if (estado === "Atendido") {
      colorEstado = { color: "green", fontWeight: "bold" };
    } else {
      if (estado === "No atendido") {
        colorEstado = { color: "orange", fontWeight: "bold" };
      } else {
        colorEstado = { color: "red", fontWeight: "bold" };
      }
    }
    return colorEstado;
  };

  useEffect(() => {
    peticionGet();
  }, [filtro]);

  const bodyEditar = (
    <div className={styles.modal}>
      <Container component="main" maxWidth="md" justifyContentContent="center">
        <Typography className={styles.modalTitle} component="h1" variant="h5">
          Editar Incidencia: {incidencia.codigoIncidencia}
        </Typography>
        <form className={styles.modalForm}>
          <Grid container spacing={2} justifyContent="center">

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
                excluirTipo=""
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
                mask="_//_ _:_"
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
            <Grid item xs={6} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                style={style.submit}
                onClick={(e) => {
                  peticionPut(e);
                  abrirCerrarModalEditar();
                }}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={6} md={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                size="large"
                color="secondary"
                style={style.submit}
                onClick={abrirCerrarModalEditar}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );

  const bodyRegistrarAtencion = (
    <div className={styles.modal}>
      <Container component="main" maxWidth="md" justifyContentContent="center">
        <Typography className={styles.modalTitle} component="h1" variant="h5">
          Atender incidencia: {incidencia.incidenciaId}
        </Typography>
        <form className={styles.modalForm}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            Style="margin-top:1px;"
          >
            <Grid item xs={12} md={12}>
              <TextField
                disabled
                name="codigoIncidencia"
                className={styles.inputMaterial}
                label="Codigo"
                onChange={handleChange}
                value={incidencia.codigoIncidencia}
              ></TextField>
            </Grid>
            <Grid item xd={12} md={12}>
              <SelectDepartamento
                disabled
                value={incidencia.departamentoId}
                label="Departamento"
                className={styles.inputMaterial}
                onChange={handleChange}
                name="departamentoId"
                required={false}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <SelectParametro
                disabled
                value={incidencia.tipoIncidenciaId}
                label="Tipo Incidencia"
                className={styles.inputMaterial}
                onChange={handleChange}
                name="tipoIncidenciaId"
                concepto="TIPO_INCIDENCIA_ID"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                disabled
                fullWidth
                multiline
                label="Descripción"
                name="descripcionIncidencia"
                className={styles.inputMaterial}
                onChange={handleChange}
                value={incidencia.descripcionIncidencia}
                helperText={errors?.descripcionIncidencia}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <SelectParametro
                value={incidencia.estadoIncidenciaId}
                label="Estado incidencia"
                className={styles.inputMaterial}
                onChange={handleChange}
                name="estadoIncidenciaId"
                concepto="ESTADO_INCIDENCIA_ID"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                style={style.submit}
                onClick={(e) => {
                  setIncidencia(incidencia)
                  peticionPut(e);
                  abrirCerrarModalAtender();
                }}
              >
                Registrar
              </Button>
            </Grid>
            <Grid item xs={6} md={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                size="large"
                color="secondary"
                style={style.submit}
                onClick={abrirCerrarModalAtender}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
       <Container component="main" maxWidth="md" justifyContent="center">
          <Typography className={styles.modalTitle} component="h1" variant="h5" align="center">Estás seguro de {incidencia.eliminado ? "activar" : "eliminar"} la incidencia</Typography>
          <Typography className={styles.modalTitle} component="h1" variant="h5" align="center"><b>{incidencia.incidenciaId}</b></Typography>
          <Grid container spacing={2} justifyContent="center">
             <Grid item xs={6} md={6}>
                <Button fullWidth variant="contained" size="large" style={style.submit} 
                color={incidencia.eliminado ? "success" : "secondary"} onClick={peticionDelete}>Si</Button>
             </Grid>
             <Grid item xs={6} md={6}>
                <Button fullWidth variant="contained" size="large" 
                color={incidencia.eliminado ? "secondary" : "primary"}
                style={style.submit} onClick={abrirCerrarModalEliminar}>No</Button>
             </Grid>
          </Grid>
       </Container>
    </div>

 )

  const bodyHistorialIncidencia = (
    <div className={styles.modalTable}>
      <Paper>
        <Container component="main" justifyContentContent="center">
          <Typography
            className={styles.modalTitle}
            component="h1"
            variant="h5"
            Style="font-weight:bold; margin: 20px 0 10px 5px;"
          >
            Historial de la incidencia: {incidencia.incidenciaId}
          </Typography>
          <Paper className={styles.paperBody}>
            <TableContainer
              className={styles.table}
              sx={{
                height: 350,
              }}
              Style="margin-bottom: 10px;"
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">N° Historial</TableCell>
                    <TableCell align="center">N° de Departamento</TableCell>
                    <TableCell align="center">Tipo de Incidencia</TableCell>
                    <TableCell align="center">Descripción</TableCell>
                    <TableCell align="center">Fecha de Incidencia</TableCell>
                    <TableCell align="center">Usuario</TableCell>
                    <TableCell align="center">Fecha de Registro</TableCell>
                    <TableCell align="center">Estado</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listaHistorialIncidencia.map(
                    (historialIncidencia, index) => (
                      <TableRow
                        key={historialIncidencia.incidenciaId}
                        style={
                          index % 2
                            ? { background: "#f5f5f5" }
                            : { background: "white" }
                        }
                      >
                        <TableCell size="small" align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {historialIncidencia.departamento}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {historialIncidencia.tipoIncidencia}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {historialIncidencia.descripcionIncidencia}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {historialIncidencia.fechaIncidencia}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {historialIncidencia.usuarioRegistro}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {historialIncidencia.fechaRegistro}
                        </TableCell>
                        <TableCell
                          size="small"
                          align="center"
                          style={styleEstadoIncidencia(
                            historialIncidencia.estadoIncidencia
                          )}
                        >
                          {historialIncidencia.estadoIncidencia}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Grid container justifyContent="flex-end">
              <Button
                type="button"
                variant="contained"
                size="large"
                color="secondary"
                style={style.submit}
                onClick={abrirCerrarModalHistorialIncidencia}
              >
                Cancelar
              </Button>
            </Grid>
          </Paper>
        </Container>
      </Paper>
    </div>
  );

  return (
    <React.Fragment>
      <Container component="main" maxWidth={false}>
        <div className={styles.crud}>
          <Paper>
            <Paper className={styles.paperTitle}>
              <Grid container justifyContent="flex-start">
                <Typography component="h5" variant="h5" style={style.crudTitle}>
                  Incidencias
                </Typography>
              </Grid>
            </Paper>
            <Paper className={styles.paperBody}>
              <Grid container spacing={2} justifyContent="flex-start">
                <Grid item container xs={3} md={2}>
                  <Grid item xs={10} md={10}>
                    <SelectDepartamento
                      value={filtro.filtroDepartamentoId}
                      label="Filtro Depart."
                      className={styles.inputMaterial}
                      onChange={handleChangeFiltro}
                      name="filtroDepartamentoId"
                      disabled={!checkFiltro.filtroDepartamentoId}
                    />
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Checkbox
                      checked={checkFiltro.filtroDepartamentoId}
                      className={styles.inputMaterial}
                      style={style.checkFiltro}
                      onChange={handleCheckFiltro}
                      color="primary"
                      value={checkFiltro.filtroDepartamentoId}
                      name="filtroDepartamentoId"
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={3} md={2}>
                  <Grid item xs={10} md={10}>
                    <SelectParametro
                      concepto="TIPO_INCIDENCIA_ID"
                      name="filtroTipoIncidenciaId"
                      className={styles.inputMaterial}
                      label="Filtro Tipo Incidencia"
                      onChange={handleChangeFiltro}
                      disabled={!checkFiltro.filtroTipoIncidenciaId}
                      value={filtro.filtroTipoIncidenciaId}
                    />
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Checkbox
                      checked={checkFiltro.filtroTipoIncidenciaId}
                      className={styles.inputMaterial}
                      style={style.checkFiltro}
                      onChange={handleCheckFiltro}
                      color="primary"
                      value={checkFiltro.filtroTipoIncidenciaId}
                      name="filtroTipoIncidenciaId"
                    />
                  </Grid>
                </Grid>

                <Grid item container xs={3} md={2}>
                  <SelectParametro
                    concepto="ESTADO_INCIDENCIA_ID"
                    name="filtroEstadoIncidenciaId"
                    className={styles.inputMaterial}
                    value={filtro.filtroEstadoIncidenciaId}
                    label="Estado"
                    onChange={handleChangeFiltro}
                  />
                </Grid>

                <Grid item container xs={3} md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkFiltro.filtroEliminado}
                        value={checkFiltro.filtroEliminado}
                        onChange={handleCheckFiltro}
                        color="primary"
                        name="filtroEliminado"
                      />
                    }
                    label="Eliminados"
                    labelPlacement="start"
                    style={style.checkFiltro}
                  />
                </Grid>
              </Grid>
              <TableContainer className={styles.table}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Codigo</TableCell>
                      <TableCell align="center">Departamento</TableCell>
                      <TableCell align="center">Tipo</TableCell>
                      <TableCell align="center">Descripcion</TableCell>
                      <TableCell align="center">Informante</TableCell>
                      <TableCell align="center">Estado</TableCell>
                      <TableCell align="center">Fecha Incidencia</TableCell>
                      <TableCell align="center">Usuario</TableCell>
                      <TableCell align="center">Fecha Registro</TableCell>
                      <TableCell align="center">Controles</TableCell>
                      <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {listaIncidencia
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((incidencia, index) => (
                        <TableRow
                          key={incidencia.incidenciaId}
                          style={
                            index % 2
                              ? { background: "#f5f5f5" }
                              : { background: "white" }
                          }
                        >
                          <TableCell size="small" align="center">
                            {incidencia.codigoIncidencia}
                          </TableCell>

                          <TableCell size="small" align="center">
                            {incidencia.departamento}
                          </TableCell>

                          <TableCell size="small" align="center">
                            {incidencia.tipoIncidencia}
                          </TableCell>

                          <TableCell size="small" align="left">
                            {incidencia.descripcionIncidencia}
                          </TableCell>

                          <TableCell size="small" align="center">
                            {incidencia.informante}
                          </TableCell>

                          <TableCell
                            size="small"
                            align="center"
                            style={
                              incidencia.estadoIncidencia === "Atendido"
                                ? { color: "green", fontWeight: "bold" }
                                : { color: "red", fontWeight: "bold" }
                            }
                          >
                            {incidencia.estadoIncidencia}
                          </TableCell>

                          <TableCell size="small" align="center">
                            {incidencia.fechaIncidencia}
                          </TableCell>
                          <TableCell size="small" align="center">
                            {incidencia.usuarioRegistro}
                          </TableCell>
                          <TableCell size="small" align="center">
                            {incidencia.fechaRegistro}
                          </TableCell>

                          <TableCell align="center">
                            <Stack spacing={1} direction="row">
                              <Button
                                disabled={
                                  incidencia.estadoIncidencia !== "No atendido"
                                }
                                variant="contained"
                                onClick={async (e) => {
                                  limpiarForm();
                                  await peticionUnico(incidencia);
                                  abrirCerrarModalAtender();
                                }}
                              >
                                GESTIONAR
                              </Button>
                              <Button
                                variant="contained"
                                color="warning"
                                onClick={async () => {
                                  // setVisita(visita);
                                  limpiarForm();
                                  setIncidencia(incidencia);
                                  await peticionGetHistorial(incidencia);
                                  abrirCerrarModalHistorialIncidencia();
                                }}
                              >
                                Historial
                              </Button>
                            </Stack>
                          </TableCell>

                          <TableCell size="small" align="center">
                            <Stack spacing={1} direction="row">
                              <IconButton
                                color="primary"
                                component="span"
                                size="medium"
                                onClick={async () => {
                                  limpiarForm();
                                  await peticionUnico(incidencia);
                                  abrirCerrarModalEditar();
                                }}
                              >
                                <Edit />
                              </IconButton>

                              <IconButton
                                color="secondary"
                                component="span"
                                size="medium"
                                onClick={() => {
                                  // limpiarForm();
                                  // setPersona(persona);
                                  // abrirCerrarModalEliminar()
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={listaIncidencia.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </Paper>
          </Paper>
        </div>
      </Container>

      <Modal
        open={modalEditar}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            abrirCerrarModalEditar();
          }
        }}
      >
        {bodyEditar}
      </Modal>

      <Modal
        open={modalHistorialIncidencia}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            abrirCerrarModalHistorialIncidencia();
          }
        }}
      >
        {bodyHistorialIncidencia}
      </Modal>

      <Modal
        open={modalAtender}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            abrirCerrarModalAtender();
          }
        }}
      >
        {bodyRegistrarAtencion}
      </Modal>
    </React.Fragment>
  );
}

export default ListarIncidencia;