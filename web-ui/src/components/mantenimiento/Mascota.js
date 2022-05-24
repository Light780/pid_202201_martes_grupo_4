import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, IconButton, FormControlLabel } from '@mui/material';
import { Edit, Delete, CheckCircle } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { useStateValue } from '../../context/store';
import SelectSexo from '../utils/SelectSexo';
import SelectParametro from '../utils/SelectParametro';
import SelectDepartamento from '../utils/SelectDepartamento';
import { actualizarMascota, borrarMascota, consultarUnico, listarMascota, registrarMascota } from '../../actions/MascotaAction';
import ResponsiveButton from '../utils/ResponsiveButton';

function Mascota() {
   const styles = useStyles();
   const [{ sesionUsuario }, dispatch] = useStateValue()
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [listaMascota, setListaMascota] = useState([])
   const [mascota, setMascota] = useState({
      mascotaId: 0,
      nombreMascota: '',
      sexo: '',
      especieId: 0,
      departamentoId: 0
   })
   const [filtro, setFiltro] = useState({
      filtroDepartamentoId: 0,
      filtroEspecieId: 0,
      filtroEliminado: 0
   })
   const [checkFiltro, setCheckFiltro] = useState({
      filtroDepartamentoId: false,
      filtroEspecieId: false,
      filtroEliminado: false
   })
   const [errores, setErrores] = useState({})
   const [modalInsertar, setModalInsertar] = useState(false);
   const [modalEditar, setModalEditar] = useState(false);
   const [modalEliminar, setModalEliminar] = useState(false);

   const handlePageChange = (event, newPage) => {
      setPage(newPage);
   };
   const handleRowsPerPageChange = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };
   const emptyRows = rowsPerPage - Math.min(rowsPerPage, listaMascota.length - page * rowsPerPage)
   const peticionGet = () => {
      listarMascota(filtro).then(respuesta => {
         if (respuesta.status === 200) {
            setListaMascota(respuesta.data)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: 'Error al listar Mascotas',
                  severity: 'error'
               }
            })
         }
      })
   }
   const limpiarForm = () => {
      setMascota({
         mascotaId: 0,
         nombreMascota: '',
         sexo: '',
         especieId: 0,
         departamentoId: 0
      })
      setErrores({})
   }
   const peticionPost = e => {
      e.preventDefault()
      const formErrors = validarForm(mascota)
      if (Object.keys(formErrors).length === 0) {
         registrarMascota(mascota).then(respuesta => {
            if (respuesta.status === 200) {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Mascota registrada correctamente",
                     severity: 'success'
                  }
               })
               abrirCerrarModalInsertar()
               limpiarForm()
               peticionGet()
            } else {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Error al guardar la Mascota\n Detalles del error : " + Object.values(respuesta.response.data.errors),
                     severity: 'error'
                  }
               })
            }
         })
      }else{
         setErrores(formErrors)
      }

   }
   const peticionPut = e => {
      e.preventDefault()
      const formErrors = validarForm(mascota)
      if (Object.keys(formErrors).length === 0) {
         actualizarMascota(mascota).then(respuesta => {
            if (respuesta.status === 200) {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Mascota actualizada correctamente",
                     severity: 'success'
                  }
               })
               abrirCerrarModalEditar()
               limpiarForm()
               peticionGet()
            } else {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Error al actualizar la Mascota, Detalles del error : " + Object.values(respuesta.response.data.errors),
                     severity: 'error'
                  }
               })
            }
         })
      }else{
         setErrores(formErrors)
      }
   }
   const peticionDelete = e => {
      e.preventDefault()
      borrarMascota(mascota.mascotaId).then(respuesta => {
         let mensaje;
         if (respuesta.status === 200) {
            mensaje = "Mascota "+ (mascota.eliminado ? "activada" : "eliminada") +" correctamente"
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
            mensaje = "Error al "+ (mascota.eliminado ? "activar" : "eliminar") + " la Mascota"
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
   const peticionUnico = async (mascota) => {
      await consultarUnico(mascota.mascotaId).then(respuesta => {
         if (respuesta.status === 200) {
            setMascota(respuesta.data)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: "Error al consultar la Mascota",
                  severity: 'error'
               }
            })
         }
      })
   }
   const validarForm = (mascota) => {
      const newErrors = {}
      if (mascota.nombreMascota === '') {
         newErrors.nombreMascota = 'El campo es obligatorio'
      }
      else if (mascota.nombreMascota.trim().length < 3) {
         newErrors.nombreMascota = 'Debe tener almenos 3 caracteres'
      }
      else if (!/^[A-Za-z ]+$/.test(mascota.nombreMascota)) {
         newErrors.nombreMascota = 'Debe contener solo letras'
      }
      
      if (mascota.sexo === '') {
         newErrors.sexo = 'El campo es obligatorio'
      }      

      if (mascota.especieId <= 0) {
         newErrors.especieId = 'Debe seleccionar una especie'
      }      

      if (mascota.departamentoId <= 0) {
         newErrors.departamentoId = 'Debe seleccionar un departamento'
      }      

      return newErrors
   }
   const handleChange = e => {
      const { name, value } = e.target
      setMascota(anterior => ({
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
            [name]: 0
         }))
      }else{
         setFiltro(anterior => ({
            ...anterior,
            [name]: name==='filtroEliminado' ? 1 : 0
         }))
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
   useEffect(() => {
      peticionGet()
   }, [filtro])

   const bodyInsertar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Registrar Mascota</Typography>
            <form className={styles.modalForm} >
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={6}>
                     <TextField value={mascota.nombreMascota} error={Boolean(errores?.nombreMascota)} helperText={(errores?.nombreMascota)} required name="nombreMascota" className={styles.inputMaterial} label="Nombre" onChange={handleChange} />
                  </Grid>

                  <Grid item xs={12} md={6}>
                     <SelectSexo value={mascota.sexo} error={Boolean(errores?.sexo)}
                        errorMessage={(errores?.sexo)}
                        name="sexo" className={styles.inputMaterial}
                        onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="ESPECIE_MASCOTA_ID" error={Boolean(errores?.especieId)}
                        errorMessage={(errores?.especieId)} name="especieId"
                        className={styles.inputMaterial} value={mascota.especieId}
                        label="Especie" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectDepartamento value={mascota.departamentoId} error={Boolean(errores?.departamentoId)}
                        errorMessage={(errores?.departamentoId)}
                        name="departamentoId" className={styles.inputMaterial}
                        onChange={handleChange} />
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
            <Typography className={styles.modalTitle} component="h1" variant="h5">Editar Mascota</Typography>
            <form className={styles.modalForm}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.nombreMascota)} helperText={(errores?.nombreMascota)} name="nombreMascota" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={mascota && mascota.nombreMascota}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectSexo value={mascota && mascota.sexo} error={Boolean(errores?.sexo)}
                        errorMessage={(errores?.sexo)}
                        name="sexo" className={styles.inputMaterial}
                        onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="ESPECIE_MASCOTA_ID" error={Boolean(errores?.especieId)}
                        errorMessage={(errores?.especieId)} name="especieId"
                        className={styles.inputMaterial} value={mascota && mascota.especieId}
                        label="Especie" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectDepartamento value={mascota && mascota.departamentoId} error={Boolean(errores?.departamentoId)}
                        errorMessage={(errores?.departamentoId)}
                        name="departamentoId" className={styles.inputMaterial}
                        onChange={handleChange} />
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
            <Typography className={styles.modalTitle} component="h1" variant="h5" align="center">Estás seguro de {mascota.eliminado ? "activar" : "eliminar"} la mascota</Typography>
            <Typography className={styles.modalTitle} component="h1" variant="h5" align="center"><b>{mascota.nombreMascota}</b></Typography>
            <Grid container spacing={2} justifyContent="center">
               <Grid item xs={6} md={6}>
                  <Button fullWidth variant="contained" size="large" style={style.submit} 
                  color={mascota.eliminado ? "success" : "secondary"} onClick={peticionDelete}>Si</Button>
               </Grid>
               <Grid item xs={6} md={6}>
                  <Button fullWidth variant="contained" size="large" 
                  color={mascota.eliminado ? "secondary" : "primary"}
                  style={style.submit} onClick={abrirCerrarModalEliminar}>No</Button>
               </Grid>
            </Grid>
         </Container>
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
                           Mascota
                        </Typography>
                     </Grid>
                  </Paper>
                  <Paper className={styles.paperBody}>
                  <Grid container spacing={2} justifyContent="flex-start">
                        <Grid item container xs={3} md={2} >
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
                        <Grid item container xs={3} md={2} >
                           <Grid item xs={10} md={10}>
                              <SelectParametro concepto="ESPECIE_MASCOTA_ID"
                                 name="filtroEspecieId"
                                 className={styles.inputMaterial}
                                 label="Filtro Especie" onChange={handleChangeFiltro}
                                 disabled={!checkFiltro.filtroEspecieId}
                                 value={filtro.filtroEspecieId}
                              />
                           </Grid>
                           <Grid item xs={2} md={2}>
                              <Checkbox checked={checkFiltro.filtroEspecieId} className={styles.inputMaterial} style={style.checkFiltro}
                                 onChange={handleCheckFiltro} color='primary' value={checkFiltro.filtroEspecieId} 
                                 name="filtroEspecieId"/>
                           </Grid>
                        </Grid>
                        <Grid item container xs={3} md={2} >
                           <Grid item xs={12} md={12}>
                              <FormControlLabel
                                 control={<Checkbox checked={checkFiltro.filtroEliminado} value={checkFiltro.filtroEliminado} onChange={handleCheckFiltro} color='primary' name="filtroEliminado" />}
                                 label="Eliminados" labelPlacement='start' style={style.checkFiltro} />
                           </Grid>
                        </Grid>
                        <Grid item container xs={3} md={6}>
                           <Grid container justifyContent="flex-end">
                              <ResponsiveButton style={style.submit} onClick={abrirCerrarModalInsertar}/>
                           </Grid>
                        </Grid>
                     </Grid>
                     <TableContainer className={styles.table}>
                        <Table stickyHeader>
                           <TableHead>
                              <TableRow>
                                 <TableCell align='center'>Nombre</TableCell>
                                 <TableCell align='center'>Sexo</TableCell>
                                 <TableCell align='center'>Especie</TableCell>
                                 <TableCell align='center'>Departamento</TableCell>
                                 <TableCell align='center'>Usuario</TableCell>
                                 <TableCell align='center'>Fecha Registro</TableCell>
                                 <TableCell align='center'>Acciones</TableCell>
                              </TableRow>
                           </TableHead>

                           <TableBody>
                              {listaMascota.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((mascota, index) => (
                                 <TableRow key={mascota.mascotaId} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>
                                    <TableCell size="small" align='center'>{mascota.nombreMascota}</TableCell>
                                    <TableCell size="small" align='center'>{mascota.sexo}</TableCell>
                                    <TableCell size="small" align='center'>{mascota.especie}</TableCell>
                                    <TableCell size="small" align='center'>{mascota.departamento}</TableCell>
                                    <TableCell size="small" align='center'>{mascota.usuario}</TableCell>
                                    <TableCell size="small" align='center'>{mascota.fechaRegistro}</TableCell>
                                    <TableCell size="small" align='center'>
                                       <IconButton color="primary" component="span" size="medium" onClick={async () => {
                                          limpiarForm();
                                          await peticionUnico(mascota);
                                          abrirCerrarModalEditar();
                                       }}>
                                          <Edit />
                                       </IconButton>
                                       <IconButton color={ mascota.eliminado? "success" :"secondary"} component="span" size="medium" onClick={() => {
                                          limpiarForm();
                                          setMascota(mascota);
                                          abrirCerrarModalEliminar()
                                       }}
                                       >
                                          {mascota.eliminado ? <CheckCircle/> : <Delete />}
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
                        count={listaMascota.length}
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
                  abrirCerrarModalInsertar();
               }
            }}>
            {bodyInsertar}
         </Modal>

         <Modal
            open={modalEditar}
            onClose={(event, reason) => {
               if (reason !== 'backdropClick') {
                  abrirCerrarModalEditar();
               }
            }}>
            {bodyEditar}
         </Modal>

         <Modal
            open={modalEliminar}
            onClose={(event, reason) => {
               if (reason !== 'backdropClick') {
                  abrirCerrarModalEliminar();
               }
            }}>
            {bodyEliminar}
         </Modal>
      </React.Fragment >
   );
}
export default Mascota;