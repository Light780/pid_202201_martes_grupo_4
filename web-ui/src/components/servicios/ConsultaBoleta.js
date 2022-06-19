import { Grid, Table, Button, Container, TextField, Typography, TableContainer, Stack, TableHead, Checkbox, TablePagination, TableCell, TableBody, TableRow, Paper, Modal } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { listarBoleta } from '../../actions/BoletaAction'
import { useStateValue } from '../../context/store';
import SelectParametro from '../utils/SelectParametro';
import SelectDepartamento from '../utils/SelectDepartamento';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import SelectPersona from '../utils/SelectPersona';
import { listarPagos, registrarPago } from '../../actions/PagoServicioAction';

function ConsultaBoleta() {
  const styles = useStyles();
  const [page, setPage] = useState(0)
  const [{ sesionUsuario }, dispatch] = useStateValue()
  const [errors, setErrors] = useState({})
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [listaBoleta, setListaBoleta] = useState([])
  const [listaPagos, setListaPagos] = useState([])
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalPagos, setModalPagos] = useState(false)
  const [boleta, setBoleta] = useState({})
  const [pagoServicio, setPagoServicio] = useState({
    boletaId: 0,
    nroOperacion: '',
    fechaPago: null,
    monto: 0.00,
    usuarioId: sesionUsuario.usuario.usuarioId,
    personaId: 0
  })
  const [filtro, setFiltro] = useState({
    filtroDepartamentoId: 0,
    filtroAnio: null,
    filtroEstadoId: 0
  })
  const [checkFiltro, setCheckFiltro] = useState({
    filtroDepartamentoId: false,
    filtroAnio: false,
    filtroEstadoId: false
  })
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, listaBoleta.length - page * rowsPerPage)
  const abrirCerrarModalInsertar = () => {
    limpiarForm()
    setModalInsertar(!modalInsertar)
  }
  const abrirCerrarModalPagos = () => {
    setModalPagos(!modalPagos)
  }
  const validarForm = (pagoServicio) => {
    const newErrors = {}
    if (pagoServicio.nroOperacion.length === 0) {
      newErrors.nroOperacion = 'El nro de operacion es obligatorio'
    } else if (pagoServicio.nroOperacion.length > 10) {
      newErrors.nroOperacion = 'El nro de operacion debe tener como máximo 10 caracteres'
    } else if (isNaN(pagoServicio.nroOperacion)) {
      newErrors.nroOperacion = 'El nro de operacion debe ser numérico'
    }

    if (pagoServicio.fechaPago == null) {
      newErrors.fechaPago = 'La fecha de pago es obligatoria'
    } else if (pagoServicio.fechaPago.getFullYear() < Number(boleta.periodo.substr(0, 4))) {
      newErrors.fechaPago = 'El año de la fecha de pago es inferior al año de la boleta'
    }

    if (pagoServicio.monto === "") {
      newErrors.monto = 'El monto es obligatorio'
    } else if (pagoServicio.monto <= 0) {
      newErrors.monto = 'El monto debe ser mayor a 0'
    } else if (pagoServicio.monto > boleta.saldo) {
      newErrors.monto = 'El monto no puede ser mayor al saldo'
    }

    if (pagoServicio.personaId === 0) {
      newErrors.personaId = 'El pagador es obligatorio'
    }

    return newErrors
  }
  const limpiarForm = () => {
    setPagoServicio({
      boletaId: 0,
      nroOperacion: '',
      fechaPago: null,
      monto: 0.00,
      usuarioId: sesionUsuario.usuario.usuarioId,
      personaId: 0
    })
  }
  const peticionPostPago = e => {
    e.preventDefault()
    const formErrors = validarForm(pagoServicio)
    if (Object.keys(formErrors).length === 0) {
      registrarPago(pagoServicio).then(response => {
        if (response.status === 200) {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: "Pago registrado correctamente",
              severity: 'success'
            }
          })
          limpiarForm()
          abrirCerrarModalInsertar()
          peticionGet()
        } else {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: "Error al registrar el Pago\n Detalles del error : " + Object.values(response.response.data.errors),
              severity: 'error'
            }
          })
        }
      })
    } else {
      setErrors(formErrors)
    }
  }
  const peticionGet = () => {
    listarBoleta(filtro).then(respuesta => {
      if (respuesta.status === 200) {
        setListaBoleta(respuesta.data)
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Error al consultar las boletas',
            severity: 'error'
          }
        })
      }
    })
  }
  const peticionGetPagos = async (boleta) => {
    await listarPagos(boleta).then(response => {
      if (response.status === 200) {
        setListaPagos(response.data)
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Error al consultar pagos',
            severity: 'error'
          }
        })
      }
    })
  }
  useEffect(() => {
    peticionGet()
  }, [filtro])

  const handleChange = e => {
    const { name, value } = e.target
    setPagoServicio((anterior) => ({
      ...anterior,
      [name]: value
    }))
  }
  const handleChangeFiltro = e => {
    const { name, value } = e.target
    setFiltro(anterior => ({
      ...anterior,
      [name]: value
    }))
  }
  const handleCheckFiltro = e => {
    const { name, value } = e.target
    setCheckFiltro(anterior => ({
      ...anterior,
      [name]: value === 'false'
    }))
    if (value === 'true') {
      setFiltro(anterior => ({
        ...anterior,
        [name]: name === 'filtroAnio' ? null : 0
      }))
    } else {
      setFiltro(anterior => ({
        ...anterior,
        [name]: name === 'filtroAnio' ? null : 0
      }))
    }
  }
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  }
  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const bodyRegistrarPago = (
    <div className={styles.modal}>
      <Container component="main" maxWidth="md" justifyContent="center">
        <Typography className={styles.modalTitle} component="h1" variant="h5">
          Registrar Pago Boleta: {boleta.boletaId}
        </Typography>
        <form className={styles.modalForm}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={12}>
              <TextField
                label="Nro. Operación"
                value={pagoServicio.nroOperacion}
                name="nroOperacion"
                className={styles.inputMaterial}
                onChange={handleChange}
                error={Boolean(errors?.nroOperacion)}
                helperText={errors?.nroOperacion}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <DateTimePicker
                label="Fecha de Pago"
                value={pagoServicio.fechaPago}
                inputFormat="dd/MM/yyyy HH:mm"
                className={styles.inputMaterial}
                mask="__/__/____ __:__"
                onChange={(e) => {
                  setPagoServicio((anterior) => ({
                    ...anterior,
                    fechaPago: e,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="fechaPago"
                    fullWidth
                    error={Boolean(errors?.fechaPago)}
                    helperText={errors?.fechaPago}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <SelectPersona
                name="personaId"
                value={pagoServicio.personaId}
                className={styles.inputMaterial}
                error={Boolean(errors?.personaId)}
                errorMessage={errors?.personaId}
                label="Pagador"
                excluirTipo={null}
                onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Saldo"
                value={boleta.saldo}
                InputProps={{
                  readOnly: true
                }}
                className={styles.inputMaterial}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Monto"
                value={pagoServicio.monto}
                name="monto"
                className={styles.inputMaterial}
                onChange={handleChange}
                error={Boolean(errors?.monto)}
                helperText={errors?.monto}
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
                onClick={peticionPostPago}
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
                onClick={abrirCerrarModalInsertar}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  )

  const bodyListarPagos = (
    <div className={styles.modalTable}>
      <Paper>
        <Container component="main" justifyContentContent="center">
          <Typography
            className={styles.modalTitle}
            component="h1"
            variant="h5"            
            Style="font-weight:bold; margin: 20px 0 10px 5px;"
          >
            Pagos Boleta: {boleta.boletaId}
          </Typography>
          <Paper className={styles.paperBody}>
            <TableContainer
              className={styles.table}
              sx={{
                height: 350
              }}
              Style="margin-bottom: 10px;"
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">N° Pago</TableCell>
                    <TableCell align="center">N° de Operación</TableCell>
                    <TableCell align="center">Fecha de Pago</TableCell>
                    <TableCell align="center">Pagador</TableCell>
                    <TableCell align="center">Monto</TableCell>
                    <TableCell align="center">Usuario</TableCell>
                    <TableCell align="center">Fecha de Registro</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listaPagos.map(
                    (pago, index) => (
                      <TableRow
                        key={pago.pagoServicioId}
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
                          {pago.nroOperacion}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {pago.fechaPago}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {pago.persona}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {pago.monto}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {pago.usuario}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {pago.fechaRegistro}
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
                onClick={abrirCerrarModalPagos}
              >
                Cerrar
              </Button>
            </Grid>
          </Paper>
        </Container>
      </Paper>
    </div>
  )
  return (
    <React.Fragment>
      <Container component="main" maxWidth={false}>
        <div className={styles.crud}>
          <Paper>
            <Paper className={styles.paperTitle}>
              <Grid container justifyContent="flex-start">
                <Typography component="h5" variant="h5" style={style.crudTitle}>
                  Consulta Boleta
                </Typography>
              </Grid>
            </Paper>
            <Paper className={styles.paperBody}>
              <Grid container spacing={2} justifyContent="flex-start">
                <Grid item container xs={4} md={2}>
                  <Grid item xs={10} md={10}>
                    <SelectDepartamento value={filtro.filtroDepartamentoId}
                      label="Filtro Depart."
                      className={styles.inputMaterial}
                      onChange={handleChangeFiltro}
                      name="filtroDepartamentoId"
                      disabled={!checkFiltro.filtroDepartamentoId} />
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Checkbox checked={checkFiltro.filtroDepartamentoId} className={styles.inputMaterial} style={style.checkFiltro}
                      onChange={handleCheckFiltro} color='primary' value={checkFiltro.filtroDepartamentoId}
                      name="filtroDepartamentoId" />
                  </Grid>
                </Grid>
                <Grid item container xs={4} md={2}>
                  <Grid item xs={10} md={10}>
                    <DatePicker
                      views={['year']}
                      label="Año"
                      disabled={!checkFiltro.filtroAnio}
                      value={filtro.filtroAnio}
                      closeOnSelect={true}
                      minDate={new Date("2001-01-01")}
                      onChange={(e) => {
                        setFiltro((anterior) => ({
                          ...anterior,
                          filtroAnio: e
                        }))
                      }}
                      renderInput={(params) => <TextField {...params}
                        name="anio"
                        fullWidth
                      />}
                    />

                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Checkbox checked={checkFiltro.filtroAnio} className={styles.inputMaterial} style={style.checkFiltro}
                      onChange={handleCheckFiltro} color='primary' value={checkFiltro.filtroAnio}
                      name="filtroAnio" />
                  </Grid>
                </Grid>
                <Grid item container xs={4} md={2}>
                  <Grid item xs={10} md={10}>
                    <SelectParametro
                      concepto="ESTADO_BOLETA"
                      name="filtroEstadoId"
                      disabled={!checkFiltro.filtroEstadoId}
                      className={styles.inputMaterial}
                      value={filtro.filtroEstadoId}
                      label="Estado"
                      onChange={handleChangeFiltro}
                    />

                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Checkbox checked={checkFiltro.filtroEstadoId} className={styles.inputMaterial} style={style.checkFiltro}
                      onChange={handleCheckFiltro} color='primary' value={checkFiltro.filtroEstadoId}
                      name="filtroEstadoId" />
                  </Grid>
                </Grid>
              </Grid>              
                <TableContainer className={styles.table}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>Departamento</TableCell>
                        <TableCell align='center'>Servicio</TableCell>
                        <TableCell align='center'>Periodo</TableCell>
                        <TableCell align='center'>CodigoPago</TableCell>
                        <TableCell align='center'>FechaPago</TableCell>
                        <TableCell align='center'>Usuario</TableCell>
                        <TableCell align='center'>Monto</TableCell>
                        <TableCell align='center'>Saldo</TableCell>
                        <TableCell align='center'>Fecha de Registro</TableCell>
                        <TableCell align='center'>Estado</TableCell>
                        <TableCell align='center'>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listaBoleta.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((boleta, index) => (
                        <TableRow key={boleta.boletaId} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>
                          <TableCell size="small" align="center"> {boleta.departamento}</TableCell>
                          <TableCell size="small" align="center">{boleta.servicio}</TableCell>
                          <TableCell size="small" align="center">{boleta.periodo}</TableCell>
                          <TableCell size="small" align="center">{boleta.codigoPago}</TableCell>
                          <TableCell size="small" align="center">{boleta.fechaPago}</TableCell>
                          <TableCell size="small" align="center">{boleta.usuario}</TableCell>
                          <TableCell size="small" align="center">{boleta.monto}</TableCell>
                          <TableCell size="small" align="center">{boleta.saldo}</TableCell>
                          <TableCell size="small" align="center">{boleta.fechaRegistro}</TableCell>
                          <TableCell size="small" align="center" width="15%"
                            style={boleta.estado === "Cancelado" ? { color: "green", fontWeight: "bold" } : { color: "red", fontWeight: "bold" }} >{boleta.estado} </TableCell>
                          <TableCell size="small" align="center">
                            <Stack spacing={1} direction="row" justifyContent="center">
                              <Button
                                variant="contained"
                                color="secondary"
                                disabled={boleta.estado === "Cancelado"}
                                onClick={() => {
                                  setBoleta(boleta);
                                  abrirCerrarModalInsertar();
                                  setPagoServicio((anterior) => ({
                                    ...anterior,
                                    boletaId: boleta.boletaId
                                  }));
                                }}>
                                Pagar
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  setBoleta(boleta);
                                  await peticionGetPagos(boleta)
                                  abrirCerrarModalPagos()
                                }}>
                                Ver pagos
                              </Button>
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
                count={listaBoleta.length}
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
        open={modalInsertar}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            abrirCerrarModalInsertar()
          }
        }}>
        {bodyRegistrarPago}
      </Modal>
      <Modal
        open={modalPagos}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            abrirCerrarModalPagos()
          }
        }}>
        {bodyListarPagos}
      </Modal>
    </React.Fragment>
  )
}

export default ConsultaBoleta