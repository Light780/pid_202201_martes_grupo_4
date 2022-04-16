import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel, Hidden, IconButton } from '@material-ui/core';
import { Edit, Delete, Info } from '@material-ui/icons/';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { listarDepartamento, registrarDepartamento, actualizarDepartamento, borrarDepartamento, consultarUnico } from '../../actions/DepartamentoAction';
import { useStateValue } from '../../context/store';
import SelectParametro from '../utils/SelectParametro';
function Departamento() {
   const styles = useStyles();
   const [{ sesionUsuario }, dispatch] = useStateValue()
   const [page, setPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [listaDepa, setListaDepa] = useState([])
   const [tipoDepaFiltro, setTipoDepaFiltro] = useState(0)
   const [checkTipoDepaFiltro, setCheckTipoDepaFiltro] = useState(false)
   const [departamento, setDepartamento] = useState({
      departamentoId: 0,
      nroDepartamento: '',
      tamano: 0.00,
      tipoDepaId: 0,
      estadoId: 0,
      cantidadHabitaciones: 0,
      indCocina: false,
      indBalcon: false,
      indLavanderia: false,
      indPiscina: false,
      indPatio: false

   })
   const [errores, setErrores] = useState({})
   const [modalInsertar, setModalInsertar] = useState(false);
   const [modalEditar, setModalEditar] = useState(false);
   const [modalEliminar, setModalEliminar] = useState(false);
   const [modalDetalle, setModalDetalle] = useState(false);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };
   const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };
   const emptyRows = rowsPerPage - Math.min(rowsPerPage, listaDepa.length - page * rowsPerPage);
   const peticionGet = (tipoDepaId) => {
      listarDepartamento(tipoDepaFiltro).then(respuesta => {
         if (respuesta.status === 200) {
            setListaDepa(respuesta.data)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: 'Error al listar Departamentos',
                  severity: 'error'
               }
            })
         }
      })
   }
   const limpiarForm = () => {
      setDepartamento({
         departamentoId: 0,
         nroDepartamento: '',
         tamano: 0.00,
         tipoDepaId: 0,
         estadoId: 0,
         cantidadHabitaciones: 0,
         indCocina: false,
         indBalcon: false,
         indLavanderia: false,
         indPiscina: false,
         indPatio: false
      })
      setErrores({})
   }
   const peticionPost = e => {
      e.preventDefault()
      validarForm(departamento)
      if (Object.keys(errores).length === 0) {
         registrarDepartamento(departamento).then(respuesta => {
            if (respuesta.status === 200) {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Departamento registrado correctamente",
                     severity: 'success'
                  }
               })
               abrirCerrarModalInsertar()
               limpiarForm()
               peticionGet(tipoDepaFiltro)
            } else {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Error al guardar el Departamento\n Detalles del error : " + Object.values(respuesta.response.data.errores),
                     severity: 'error'
                  }
               })
            }
         })
      }

   }
   const peticionPut = e => {
      e.preventDefault()
      validarForm(departamento)
      if (Object.keys(errores).length === 0) {
         actualizarDepartamento(departamento).then(respuesta => {
            if (respuesta.status === 200) {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Departamento actualizado correctamente",
                     severity: 'success'
                  }
               })
               abrirCerrarModalEditar()
               limpiarForm()
               peticionGet(tipoDepaFiltro)
            } else {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Error al actualizar el Departamento, Detalles del error : " + Object.values(respuesta.response.data.errores),
                     severity: 'error'
                  }
               })
            }
         })
      }

   }
   const peticionDelete = e => {
      e.preventDefault()
      borrarDepartamento(departamento.departamentoId).then(respuesta => {
         if (respuesta.status === 200) {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: "Departamento eliminado correctamente",
                  severity: 'success'
               }
            })
            abrirCerrarModalEliminar()
            limpiarForm()
            peticionGet(tipoDepaFiltro)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: "Error al eliminar el Departamento",
                  severity: 'error'
               }
            })
         }
      })
   }
   const peticionUnico = async (departamento) => {
      await consultarUnico(departamento.departamentoId).then(respuesta => {
         if (respuesta.status === 200) {
            setDepartamento(respuesta.data)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: "Error al consultar el Departamento",
                  severity: 'error'
               }
            })
         }
      })
   }
   const validarForm = (departamento) => {

      if (departamento.nroDepartamento === '') {
         setErrores(anterior => ({
            ...anterior,
            nroDepartamento: 'El campo es obligatorio'
         }))
      }
      else if (!/^[0-9]+$/.test(departamento.nroDepartamento)) {
         setErrores(anterior => ({
            ...anterior,
            nroDepartamento: 'Debe ser numérico'
         }))
      }
      else if (departamento.nroDepartamento.trim().length !== 3) {
         setErrores(anterior => ({
            ...anterior,
            nroDepartamento: 'Debe tener 3 caracteres'
         }))
      }
      else delete errores.nroDepartamento


      if (departamento.tamano === '') {
         setErrores(anterior => ({
            ...anterior,
            tamano: 'El campo es obligatorio'
         }))
      }
      else if (!/^[0-9.]+$/.test(departamento.tamano)) {
         setErrores(anterior => ({
            ...anterior,
            tamano: 'Debe ser numérico'
         }))
      }
      else if (departamento.tamano <= 0) {
         setErrores(anterior => ({
            ...anterior,
            tamano: 'Debe ser mayor a 0'
         }))
      }
      else delete errores.tamano


      if (departamento.tipoDepaId <= 0) {
         setErrores(anterior => ({
            ...anterior,
            tipoDepaId: 'Debe seleccionar un tipo'
         }))
      }
      else delete errores.tipoDepaId


      if (departamento.estadoId <= 0) {
         setErrores(anterior => ({
            ...anterior,
            estadoId: 'Debe seleccionar un estado'
         }))
      }
      else delete errores.estadoId


      if (departamento.cantidadHabitaciones <= 0) {
         setErrores(anterior => ({
            ...anterior,
            cantidadHabitaciones: 'Debe ser mayor a 0'
         }))
      }
      else delete errores.cantidadHabitaciones

   }
   const handleChange = e => {
      const { name, value } = e.target
      setDepartamento(anterior => ({
         ...anterior,
         [name]: value
      }))
   }
   const handleCheck = e => {
      const { name, value } = e.target
      setDepartamento(anterior => ({
         ...anterior,
         [name]: value === 'false'
      }))
   }
   const handleChangeFiltro = e => {
      setTipoDepaFiltro(e.target.value);      
   }
   const handleCheckFiltro = e => {
      setCheckTipoDepaFiltro(e.target.value === 'false');
      if(e.target.value === 'true'){
         setTipoDepaFiltro(0)
      }
   }
   const abrirCerrarModalInsertar = () => {
      limpiarForm()
      setModalInsertar(!modalInsertar);
   }
   const abrirCerrarModalEditar = () => {
      setModalEditar(!modalEditar);
   }
   const abrirCerrarModalEliminar = () => {
      setModalEliminar(!modalEliminar);
   }
   const abrirCerrarModalDetalle = () => {
      setModalDetalle(!modalDetalle);
   }
   useEffect(() => {
      peticionGet(tipoDepaFiltro)
   }, [tipoDepaFiltro])

   const bodyInsertar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Registrar Departamento</Typography>
            <form className={styles.modalForm} >
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <TextField value={departamento.nroDepartamento} error={Boolean(errores?.nroDepartamento)} helperText={(errores?.nroDepartamento)} required name="nroDepartamento" className={styles.inputMaterial} label="Nro de Departamento" onChange={handleChange} />
                  </Grid>

                  <Grid item xs={12} md={6}>
                     <TextField value={departamento.tamano} error={Boolean(errores?.tamano)} helperText={(errores?.tamano)} required name="tamano" type="number" className={styles.inputMaterial} label="Area m2" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="TIPO_DEPA_ID" error={Boolean(errores?.tipoDepaId)}
                        errorMessage={(errores?.tipoDepaId)} name="tipoDepaId"
                        className={styles.inputMaterial} value={departamento.tipoDepaId}
                        label="Tipo Departamento" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="ESTADO_ID" error={Boolean(errores?.estadoId)}
                        errorMessage={(errores?.estadoId)} name="estadoId"
                        className={styles.inputMaterial} value={departamento.estadoId}
                        label="Estado" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField value={departamento.cantidadHabitaciones} error={Boolean(errores?.cantidadHabitaciones)} helperText={(errores?.cantidadHabitaciones)} required name="cantidadHabitaciones" type="number" className={styles.inputMaterial} label="Cantidad de Habitaciones" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={2}>
                     <FormControlLabel
                        control={<Checkbox checked={departamento.indCocina} value={departamento.indCocina} onChange={handleCheck} color='primary' name="indCocina" />}
                        label="Cocina" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                     <FormControlLabel
                        control={<Checkbox checked={departamento.indBalcon} value={departamento.indBalcon} onChange={handleCheck} color='primary' name="indBalcon" />}
                        label="Balcon" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                     <FormControlLabel
                        control={<Checkbox checked={departamento.indLavanderia} value={departamento.indLavanderia} onChange={handleCheck} color='primary' name="indLavanderia" />}
                        label="Lavanderia" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                     <FormControlLabel
                        control={<Checkbox checked={departamento.indPiscina} value={departamento.indPiscina} onChange={handleCheck} color='primary' name="indPiscina" />}
                        label="Piscina" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                     <FormControlLabel
                        control={<Checkbox checked={departamento.indPatio} value={departamento.indPatio} onChange={handleCheck} color='primary' name="indPatio" />}
                        label="Patio" />
                  </Grid>
               </Grid>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} md={6}>
                     <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit} onClick={peticionPost}>
                        Guardar
                     </Button>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Button type="button" fullWidth variant="contained" size="large" color="secondary" style={style.submit} onClick={abrirCerrarModalInsertar}>
                        Cancelar
                     </Button>
                  </Grid>
               </Grid>
            </form>
         </Container>

      </div>
   )
   const bodyEditar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContentContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Editar Departamento</Typography>
            <form className={styles.modalForm}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <TextField error={Boolean(errores?.nroDepartamento)} helperText={(errores?.nroDepartamento)} name="nroDepartamento" className={styles.inputMaterial} label="NroDepartamento" onChange={handleChange} value={departamento && departamento.nroDepartamento}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.tamano)} helperText={(errores?.tamano)} name="tamano" className={styles.inputMaterial} label="Area m2" onChange={handleChange} value={departamento && departamento.tamano}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="TIPO_DEPA_ID" error={Boolean(errores?.tipoDepaId)}
                        errorMessage={(errores?.tipoDepaId)} name="tipoDepaId"
                        className={styles.inputMaterial} value={departamento.tipoDepaId}
                        label="Tipo Departamento" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="ESTADO_ID" error={Boolean(errores?.estadoId)}
                        errorMessage={(errores?.estadoId)} name="estadoId"
                        className={styles.inputMaterial} value={departamento.estadoId}
                        label="Estado" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.cantidadHabitaciones)} helperText={(errores?.cantidadHabitaciones)} name="cantidadHabitaciones" className={styles.inputMaterial} label="CantHabitaciones" onChange={handleChange} value={departamento && departamento.cantidadHabitaciones}></TextField>
                  </Grid>
                  <Grid item xs={12} md={2}>
                     <FormControlLabel
                        control={<Checkbox checked={departamento.indCocina} onChange={handleCheck} value={departamento.indCocina} color='primary' name="indCocina" />}
                        label="Cocina" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                     <FormControlLabel
                        control={<Checkbox checked={departamento.indBalcon} onChange={handleCheck} value={departamento.indBalcon} color='primary' name="indBalcon" />}
                        label="Balcon" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                     <FormControlLabel
                        control={<Checkbox checked={departamento.indLavanderia} onChange={handleCheck} value={departamento.indLavanderia} color='primary' name="indLavanderia" />}
                        label="Lavanderia" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                     <FormControlLabel
                        control={<Checkbox checked={departamento.indPiscina} onChange={handleCheck} value={departamento.indPiscina} color='primary' name="indPiscina" />}
                        label="Piscina" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                     <FormControlLabel
                        control={<Checkbox checked={departamento.indPatio} onChange={handleCheck} value={departamento.indPatio} color='primary' name="indPatio" />}
                        label="Patio" />
                  </Grid>
               </Grid>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} md={6}>
                     <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit} onClick={peticionPut}>
                        Guardar
                     </Button>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Button type="button" fullWidth variant="contained" size="large" color="secondary" style={style.submit} onClick={abrirCerrarModalEditar}>Cancelar</Button>
                  </Grid>
               </Grid>
            </form>
         </Container>
      </div>

   )

   const bodyEliminar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5" align="center">Estás seguro de eliminar el departamento</Typography>
            <Typography className={styles.modalTitle} component="h1" variant="h5" align="center"><b>{departamento.nroDepartamento}</b></Typography>
            <Grid container spacing={2} justifyContent="center">
               <Grid item xs={6} md={6}>
                  <Button fullWidth variant="contained" size="large" style={style.submit} color="secondary" onClick={peticionDelete}>Si</Button>
               </Grid>
               <Grid item xs={6} md={6}>
                  <Button fullWidth variant="contained" size="large" style={style.submit} onClick={abrirCerrarModalEliminar}>No</Button>
               </Grid>
            </Grid>
         </Container>
      </div>

   )

   const bodyDetalle = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Detalle Departamento</Typography>
            <div style={style.detail}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>N° Depart.</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{departamento.nroDepartamento}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Tipo Depart.</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{departamento.tipoDepa}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Area</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{departamento.tamano}m2</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>N° Habitaciones</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{departamento.cantidadHabitaciones}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Cocina</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{departamento.indCocina ? 'Si' : 'No'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Balcon</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{departamento.indBalcon ? 'Si' : 'No'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Piscina</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{departamento.indPiscina ? 'Si' : 'No'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Patio</Typography>
                  </Grid>

                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{departamento.indPatio ? 'Si' : 'No'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Lavanderia</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{departamento.indLavanderia ? 'Si' : 'No'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Estado</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{departamento.estado}</Typography>
                  </Grid>
               </Grid>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <Button type="button" fullWidth variant="contained" size="large" color="secondary" style={style.submit} onClick={abrirCerrarModalDetalle}>Cerrar</Button>
                  </Grid>
               </Grid>
            </div>
         </Container>
      </div>
   )

   return (
      <React.Fragment>
         <div className={styles.crud}>
            <Paper>
               <Paper className={styles.paperTitle}>
                  <Grid container justifyContent="flex-start">
                     <Typography component="h5" variant="h5" style={style.crudTitle}>
                        Departamento
                     </Typography>
                  </Grid>
               </Paper>
               <Paper className={styles.paperBody}>
                  <Grid container spacing={2} justifyContent="flex-start">
                     <Grid item container xs={6} md={2} >                        
                        <Grid item xs={10} md={10}>
                           <SelectParametro concepto="TIPO_DEPA_ID"
                              className={styles.inputMaterial}
                              label="Filtro Tipo Departamento" onChange={handleChangeFiltro}
                              disabled={!checkTipoDepaFiltro}
                              value={tipoDepaFiltro}
                           />
                        </Grid>
                        <Grid item xs={2} md={2}>
                           <Checkbox checked={checkTipoDepaFiltro} className={styles.inputMaterial} style={style.checkFiltro}
                           onChange={handleCheckFiltro} color='primary' value={checkTipoDepaFiltro} />
                        </Grid>
                     </Grid>
                     <Grid item container xs={6} md={10}>
                        <Grid container justifyContent="flex-end">
                           <Button type="button" variant="contained" size="large" color="primary" style={style.submit} onClick={abrirCerrarModalInsertar}>
                              Registrar
                           </Button>
                        </Grid>
                     </Grid>
                  </Grid>
                  <TableContainer className={styles.table}>
                     <Table stickyHeader>
                        <TableHead>
                           <TableRow>
                              <TableCell align='center'>N° Depart.</TableCell>
                              <TableCell align='center'>Tipo Depart.</TableCell>
                              <Hidden mdDown>
                                 <TableCell align='center'>N° de Habitaciones</TableCell>
                                 <TableCell align='center'>Area</TableCell>
                              </Hidden>
                              <TableCell align='center'>Estado</TableCell>
                              <TableCell align='center'>Acciones</TableCell>
                           </TableRow>
                        </TableHead>

                        <TableBody>
                           {listaDepa.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((departamento, index) => (
                              <TableRow key={departamento.departamentoId} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>
                                 <TableCell size="small" align='center'>{departamento.nroDepartamento}</TableCell>
                                 <TableCell size="small" align='center'>{departamento.tipoDepa}</TableCell>
                                 <Hidden mdDown>
                                    <TableCell size="small" align='center'>{departamento.cantidadHabitaciones}</TableCell>
                                    <TableCell size="small" align='center'>{departamento.tamano}m2</TableCell>
                                 </Hidden>
                                 <TableCell size="small" align='center'>{departamento.estado}</TableCell>
                                 <TableCell size="small" align='center'>
                                    <IconButton color="primary" component="span" size="medium" onClick={async () => {
                                       limpiarForm();
                                       await peticionUnico(departamento);
                                       abrirCerrarModalEditar();
                                    }}>
                                       <Edit />
                                    </IconButton>
                                    <IconButton color="default" component="span" size="medium" onClick={() => {
                                       limpiarForm(); setDepartamento(departamento); abrirCerrarModalDetalle()
                                    }}>
                                       <Info />
                                    </IconButton>
                                    <IconButton color="secondary" component="span" size="medium" onClick={() => {
                                       limpiarForm();
                                       setDepartamento(departamento);
                                       abrirCerrarModalEliminar()
                                    }}
                                    >
                                       <Delete />
                                    </IconButton>
                                 </TableCell>
                              </TableRow>
                           ))}
                           {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                 <TableCell colSpan={6} />
                              </TableRow>)}
                        </TableBody>
                     </Table>
                  </TableContainer>
                  <TablePagination
                     rowsPerPageOptions={[5, 10, 25]}
                     component="div"
                     count={listaDepa.length}
                     rowsPerPage={rowsPerPage}
                     page={page}
                     onChangePage={handleChangePage}
                     onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
               </Paper>
            </Paper>
            <Modal
               open={modalInsertar}
               onClose={abrirCerrarModalInsertar} disableBackdropClick >
               {bodyInsertar}
            </Modal>

            <Modal
               open={modalEditar}
               onClose={abrirCerrarModalEditar} disableBackdropClick >
               {bodyEditar}
            </Modal>

            <Modal
               open={modalEliminar}
               onClose={abrirCerrarModalEliminar} disableBackdropClick >
               {bodyEliminar}
            </Modal>
            <Modal
               open={modalDetalle}
               onClose={abrirCerrarModalDetalle} disableBackdropClick >
               {bodyDetalle}
            </Modal>
         </div>
      </React.Fragment >
   );
}
export default Departamento;

