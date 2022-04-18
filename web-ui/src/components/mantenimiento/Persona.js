import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel, Hidden, IconButton } from '@material-ui/core';
import { Edit, Delete, Info } from '@material-ui/icons/';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { registrarPersona, consultarPersona } from '../../actions/PersonaAction';
import { useStateValue } from '../../context/store';
import SelectParametro from '../utils/SelectParametro';
function Persona() {
   const styles = useStyles();
   const [{ sesionUsuario }, dispatch] = useStateValue()
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [listaPersona, setListaPersona] = useState([])
   const [persona, setPersona] = useState({
      personaId: 0,
      nombreCompleto: '',
      documento: 0,
      tipoDocumentoId: '',
      telefono: 0,
      estadoId: '',
      correo: '',
      sexo: '',
      tipoPersonaId: '',
      personaId: 0

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
   const emptyRows = rowsPerPage - Math.min(rowsPerPage, listaPersona.length - page * rowsPerPage);
   const peticionGet = () => {
      // listarPersona().then(respuesta => {
      //    if (respuesta.status === 200) {
      //       setListaPersona(respuesta.data)
      //    } else {
      //       dispatch({
      //          type: 'OPEN_SNACKBAR',
      //          openMensaje: {
      //             open: true,
      //             mensaje: 'Error al listar Persona',
      //             severity: 'error'
      //          }
      //       })
      //    }
      // })
   }
   const limpiarForm = () => {
      setPersona({
         personaId: 0,
         nombreCompleto: '',
         documento: 0,
         tipoDocumentoId: '',
         telefono: 0,
         estadoId: '',
         correo: '',
         sexo: '',
         tipoPersonaId: '',
         departamentoId: 0
      })
      setErrores({})
   }
   const peticionPost = e => {
      e.preventDefault()
      // validarForm(persona)
      // if (Object.keys(errores).length === 0) {
      //    registrarPersona(persona).then(respuesta => {
      //       if (respuesta.status === 200) {
      //          dispatch({
      //             type: 'OPEN_SNACKBAR',
      //             openMensaje: {
      //                open: true,
      //                mensaje: "Persona registrada correctamente",
      //                severity: 'success'
      //             }
      //          })
      //          abrirCerrarModalInsertar()
      //          limpiarForm()
      //          peticionGet()
      //       } else {
      //          dispatch({
      //             type: 'OPEN_SNACKBAR',
      //             openMensaje: {
      //                open: true,
      //                mensaje: "Error al guardar la Persona\n Detalles del error : " + Object.values(respuesta.response.data.errores),
      //                severity: 'error'
      //             }
      //          })
      //       }
      //    })
      // }

   }
   const peticionUnico = async (persona) => {
      // await consultarUnico(persona.personaId).then(respuesta => {
      //    if (respuesta.status === 200) {
      //       setPersona(respuesta.data)
      //    } else {
      //       dispatch({
      //          type: 'OPEN_SNACKBAR',
      //          openMensaje: {
      //             open: true,
      //             mensaje: "Error al consultar la persona",
      //             severity: 'error'
      //          }
      //       })
      //    }
      // })
   }

   const validarForm = (persona) => {

      if (persona.nroDocumento === '') {
         setErrores(anterior => ({
            ...anterior,
            nroDocumento: 'El campo es obligatorio'
         }))
      }
      else if (!/^[0-9]+$/.test(persona.nroDocumento)) {
         setErrores(anterior => ({
            ...anterior,
            nroDocumento: 'Debe ser numérico'
         }))
      }
      else if (persona.nroDocumento.trim().length !== 8) {
         setErrores(anterior => ({
            ...anterior,
            nroDocumento: 'Debe tener 8 caracteres'
         }))
      }
      else delete errores.nroDocumento


      if (persona.telefono === '') {
         setErrores(anterior => ({
            ...anterior,
            telefono: 'El campo es obligatorio'
         }))
      }
      else if (!/^[0-9]+$/.test(persona.telefono)) {
         setErrores(anterior => ({
            ...anterior,
            telefono: 'Debe ser numérico'
         }))
      }
      else if (persona.telefono.trim().length !== 9) {
         setErrores(anterior => ({
            ...anterior,
            telefono: 'Debe tener 9 caracteres'
         }))
      }
      else delete errores.telefono
   }
   const handleChange = e => {
      const { name, value } = e.target
      setPersona(anterior => ({
         ...anterior,
         [name]: value
      }))
   }
   const handleCheck = e => {
      const { name, value } = e.target
      setPersona(anterior => ({
         ...anterior,
         [name]: value === 'false'
      }))
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
      peticionGet()
   }, [])

   const bodyInsertar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Registrar Persona</Typography>
            <form className={styles.modalForm}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={6}>
                     <TextField name="nombres" className={styles.inputMaterial} label="Nombres" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="doc" className={styles.inputMaterial} label="Documento " onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="TIPO_DOC_ID" error={Boolean(errores?.tipoDocumentoId)}
                        errorMessage={(errores?.tipoDocumentoId)} name="tipoDocumentoId"
                        className={styles.inputMaterial} value={persona.tipoDocumentoId}
                        label="Tipo Documento" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="telefono" className={styles.inputMaterial} label="Telefono" onChange={handleChange} />
                  </Grid>
                                   <Grid item xs={12} md={6}>
                     <SelectParametro concepto="ESTADO_ID" error={Boolean(errores?.estadoId)}
                        errorMessage={(errores?.estadoId)} name="estadoId"
                        className={styles.inputMaterial} value={persona.estadoId}
                        label="Estado" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="correo" className={styles.inputMaterial} label="Correo" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="sexo" className={styles.inputMaterial} label="Sexo" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="TIPO_PERSONA_ID" error={Boolean(errores?.tipoPersonaId)}
                        errorMessage={(errores?.tipoPersonaId)} name="tipopersonaId"
                        className={styles.inputMaterial} value={persona.tipoPersonaId}
                        label="Tipo Persona" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="DEPA_ID" error={Boolean(errores?.personaId)}
                        errorMessage={(errores?.departamentoId)} name="departamentoId"
                        className={styles.inputMaterial} value={persona.departamentoId}
                        label="Departamento ID" onChange={handleChange}
                     />
                  </Grid>
               </Grid>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} md={6}>
                     <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit} onClick={() => peticionPost()}>
                        Guardar
                     </Button>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Button type="submit" fullWidth variant="contained" size="large" color="secondary" style={style.submit} onClick={abrirCerrarModalInsertar}>Cancelar</Button>
                  </Grid>
               </Grid>
            </form>
         </Container>

      </div>

      
   )

   const bodyEditar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContentContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Editar Persona</Typography>
            <form className={styles.modalForm}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <TextField error={Boolean(errores?.nroPersona)} helperText={(errores?.nroPersona)} name="nombres" className={styles.inputMaterial} label="Nombres" onChange={handleChange} value={persona && persona.nombreCompleto}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.documento)} helperText={(errores?.documento)} name="documento" className={styles.inputMaterial} label="Documento" onChange={handleChange} value={persona && persona.documento}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="TIPO_DOC_ID" error={Boolean(errores?.tipoDocumentoId)}
                        errorMessage={(errores?.tipoDocumentoId)} name="tipoDocId"
                        className={styles.inputMaterial} value={persona.tipoDocumentoId}
                        label="Tipo Documento" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.telefono)} helperText={(errores?.telefono)} name="telefono" className={styles.inputMaterial} label="Telefono" onChange={handleChange} value={persona && persona.telefono}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="ESTADO_ID" error={Boolean(errores?.estadoId)}
                        errorMessage={(errores?.estadoId)} name="estadoId"
                        className={styles.inputMaterial} value={persona.estadoId}
                        label="Estado" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.correo)} helperText={(errores?.correo)} name="correo" className={styles.inputMaterial} label="Correo" onChange={handleChange} value={persona && persona.correo}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.sexo)} helperText={(errores?.sexo)} name="sexo" className={styles.inputMaterial} label="Sexo" onChange={handleChange} value={persona && persona.sexo}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="TIPO_PERSONA_ID" error={Boolean(errores?.tipoPersonaId)}
                        errorMessage={(errores?.tipoPersonaId)} name="tipopersonaId"
                        className={styles.inputMaterial} value={persona.tipoPersonaId}
                        label="Tipo Persona" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="DEPA_ID" error={Boolean(errores?.departamentoId)}
                        errorMessage={(errores?.departamentoId)} name="tipopersonaId"
                        className={styles.inputMaterial} value={persona.departamentoId}
                        label="Departamento ID" onChange={handleChange}
                     />
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
         <Typography className={styles.modalTitle} component="h1" variant="h5" align="center">Estás seguro de eliminar la Persona</Typography>
         <Typography className={styles.modalTitle} component="h1" variant="h5" align="center"><b>{persona.nroDocumento}</b></Typography>
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
            <Typography className={styles.modalTitle} component="h1" variant="h5">Detalle Persona</Typography>
            <div style={style.detail}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Nombres </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{persona.nombreCompleto}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Documento</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{persona.documento}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Telefono</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{persona.telefono}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Correo</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{persona.correo}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Sexo</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{persona.sexo}</Typography>
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
                        Persona
                     </Typography>
                  </Grid>
               </Paper>
               <Paper className={styles.paperBody}>
                  <Grid container spacing={2} justifyContent="flex-start">
                     <Grid item container xs={6} md={2} >                        
                        <Grid item xs={10} md={10}>
                           <SelectParametro concepto="DOCUMENTO"
                              className={styles.inputMaterial}
                              label="Filtro Tipo Documento" onChange={handleChangeFiltro}
                              disabled={!checkTipoDocumentoFiltro}
                              value={checkTipoDocumentoFiltro}
                           />
                        </Grid>
                        <Grid item xs={2} md={2}>
                           <Checkbox checked={checkTipoDocumentoFiltro} className={styles.inputMaterial} style={style.checkFiltro}
                           onChange={handleCheckFiltro} color='primary' value={checkTipoDocumentoFiltro} />
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
                              <TableCell align='center'>Nombres</TableCell>
                              <TableCell align='center'>Documento</TableCell>
                              <Hidden mdDown>
                                 <TableCell align='center'>Telefono</TableCell>
                                 <TableCell align='center'>Correo</TableCell>
                              </Hidden>
                              <TableCell align='center'>Estado</TableCell>
                              <TableCell align='center'>Departamento ID</TableCell>
                              <TableCell align='center'>Acciones</TableCell>
                           </TableRow>
                        </TableHead>

                        <TableBody>
                           {listaPersona.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((persona, index) => (
                              <TableRow key={persona.departamentoId} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>
                                 <TableCell size="small" align='center'>{persona.nombreCompleto}</TableCell>
                                 <TableCell size="small" align='center'>{persona.documento}</TableCell>
                                 <Hidden mdDown>
                                    <TableCell size="small" align='center'>{persona.telefono}</TableCell>
                                    <TableCell size="small" align='center'>{persona.correo}</TableCell>
                                 </Hidden>
                                 <TableCell size="small" align='center'>{persona.estado}</TableCell>
                                 <TableCell size="small" align='center'>{persona.departamentoId}</TableCell>
                                 <TableCell size="small" align='center'>
                                    <IconButton color="primary" component="span" size="medium" onClick={async () => {
                                       limpiarForm();
                                       await peticionUnico(persona);
                                       abrirCerrarModalEditar();
                                    }}>
                                       <Edit />
                                    </IconButton>
                                    <IconButton color="default" component="span" size="medium" onClick={() => {
                                       limpiarForm(); setPersona(persona); abrirCerrarModalDetalle()
                                    }}>
                                       <Info />
                                    </IconButton>
                                    <IconButton color="secondary" component="span" size="medium" onClick={() => {
                                       limpiarForm();
                                       setPersona(persona);
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
                     count={listaPersona.length}
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

export default Persona;

