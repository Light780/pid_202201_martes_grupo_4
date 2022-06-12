import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, IconButton, Hidden, FormControlLabel } from '@mui/material';
import { Edit, Delete, Info, CheckCircle } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { registrarPersona, listarPersona, consultarUnico, actualizarPersona, borrarPersona } from '../../actions/PersonaAction';
import { useStateValue } from '../../context/store';
import SelectParametro from '../utils/SelectParametro';
import SelectDepartamento from '../utils/SelectDepartamento';
import SelectSexo from '../utils/SelectSexo';
import ResponsiveButton from '../utils/ResponsiveButton';

function Persona() {
   const styles = useStyles();
   const [{ sesionUsuario }, dispatch] = useStateValue()
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [listaPersona, setListaPersona] = useState([])
   const [persona, setPersona] = useState({
      personaId: 0,
      nombreCompleto: '',
      documento: '',
      tipoDocumentoId: 0,
      telefono: '',
      estadoId: 0,
      correo: '',
      sexo: '',
      tipoPersonaId: 0,
      departamentoId: 0,
      usuarioId: sesionUsuario.usuario.usuarioId
   })
   const [filtro, setFiltro] = useState({
      filtroDepartamentoId: 0,
      filtroTipoPersonaId: 0,
      filtroEliminado:0
   })
   const [checkFiltro, setCheckFiltro] = useState({
      filtroDepartamentoId: false,
      filtroTipoPersonaId: false,
      filtroEliminado:false
   })
   const [errores, setErrores] = useState({})
   const [modalInsertar, setModalInsertar] = useState(false);
   const [modalEditar, setModalEditar] = useState(false);
   const [modalEliminar, setModalEliminar] = useState(false);
   const [modalDetalle, setModalDetalle] = useState(false);

   const handlePageChange = (event, newPage) => {
      setPage(newPage);
   };
   const handleRowsPerPageChange = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };
   const emptyRows = rowsPerPage - Math.min(rowsPerPage, listaPersona.length - page * rowsPerPage);
   const peticionGet = () => {
      listarPersona(filtro).then(respuesta => {
         if (respuesta.status === 200) {
            setListaPersona(respuesta.data)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: 'Error al listar Persona',
                  severity: 'error'
               }
            })
         }
      })
   }
   const limpiarForm = () => {
      setPersona({
         personaId: 0,
         nombreCompleto: '',
         documento: '',
         tipoDocumentoId: 0,
         telefono: '',
         estadoId: 0,
         correo: '',
         sexo: '',
         tipoPersonaId: 0,
         departamentoId: 0,
         usuarioId: sesionUsuario.usuario.usuarioId
      })
      setErrores({})
   }
   const peticionPost = e => {
      e.preventDefault()
      const formErrors = validarForm(persona)
      if (Object.keys(formErrors).length === 0) {
         persona.usuarioId = sesionUsuario.usuarioId;
         registrarPersona(persona).then(respuesta => {
            if (respuesta.status === 200) {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Persona registrada correctamente",
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
                     mensaje: "Error al guardar la Persona\n Detalles del error : " + Object.values(respuesta.response.data.errors),
                     severity: 'error'
                  }
               })
            }
         })
      }else{
         setErrores(formErrors)
      }

   }
   const peticionUnico = async (persona) => {
      await consultarUnico(persona.personaId).then(respuesta => {
         if (respuesta.status === 200) {
            setPersona(respuesta.data)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: "Error al consultar la Persona",
                  severity: 'error'
               }
            })
         }
      })
   }

   const peticionPut = e => {
      e.preventDefault()
      const formErrors = validarForm(persona)
      if (Object.keys(formErrors).length === 0) {
         actualizarPersona(persona).then(respuesta => {
            if (respuesta.status === 200) {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Persona actualizada correctamente",
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
                     mensaje: "Error al actualizar la Persona\n Detalles del error : " + Object.values(respuesta.response.data.errors),
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
      borrarPersona(persona.personaId).then(respuesta => {         
         let mensaje;
         if (respuesta.status === 200) {
            mensaje = "Persona "+ (persona.eliminado ? "activada" : "eliminada") +" correctamente"
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
            mensaje = "Error al "+ (persona.eliminado ? "activar" : "eliminar") + " la Persona"
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
   const validarForm = (persona) => {

      const newErrors = {}
  
        if (persona.nombreCompleto === '') {
           newErrors.nombreCompleto = 'El campo es obligatorio'
        }
        else if (persona.nombreCompleto.trim().length < 3) {
           newErrors.nombreCompleto = 'Debe tener almenos 3 caracteres'
        }
        else if (!/^[A-Za-z ]+$/.test(persona.nombreCompleto)) {
           newErrors.nombreCompleto = 'Debe contener solo letras'
        }        
  
        if (persona.documento === '') {
           newErrors.documento = 'El campo es obligatorio'
        }
        else if (!/^[0-9]+$/.test(persona.documento)) {
           newErrors.documento = 'Debe ser numérico'
        }
        else if (persona.tipoDocumentoId === 0) {
           newErrors.documento = 'Debe seleccionar un tipo de documento'
        }
        else if (persona.documento.trim().length >= 0) {
           let longitud = persona.documento.length;
           if (persona.tipoDocumentoId === 1) {
              if (longitud !== 8) {
                 newErrors.documento = 'Debe tener 8 caracteres'
              } else {
                 delete newErrors.documento
              }
           } else {
              if (longitud !== 12) {
                 newErrors.documento = 'Debe tener 12 caracteres'
              }
           }
        }
  
        if (persona.telefono === '') {
           newErrors.telefono = 'El campo es obligatorio'
        }
        else if (!/^[0-9]+$/.test(persona.telefono)) {
           newErrors.telefono = 'Debe ser numérico'
        }
        else if (persona.telefono.trim().length !== 9 && persona.telefono.trim().length !== 7) {
           newErrors.telefono = 'Debe tener 9 o 7 caracteres'
        }
          
        if (persona.tipoDocumentoId <= 0) {
           newErrors.tipoDocumentoId = 'Debe seleccionar un tipo de documento'
        }
          
        if (persona.estadoId <= 0) {
           newErrors.estadoId = 'Debe seleccionar un estado'
        }
          
        if (persona.tipoPersonaId <= 0) {
           newErrors.tipoPersonaId = 'Debe seleccionar un estado'
        }
          
        if (persona.sexo === '') {
           newErrors.sexo = 'El campo es obligatorio'
        }
        
        if (persona.correo === '') {
           newErrors.correo = 'El campo es obligatorio'
        }
        else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(persona.correo)) {
           newErrors.correo = 'Debe ser un correo valido'
        }
          
        if (persona.departamentoId <= 0) {
           newErrors.departamentoId = 'Debe seleccionar un departamento'
        }        
  
        return newErrors;
   }
   const handleChange = e => {
      const { name, value } = e.target
      setPersona(anterior => ({
         ...anterior,
         [name]: value
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
   }, [filtro])

   const bodyInsertar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Registrar Persona</Typography>
            <form className={styles.modalForm}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <TextField name="nombreCompleto" error={Boolean(errores?.nombreCompleto)} helperText={(errores?.nombreCompleto)}
                        className={styles.inputMaterial} label="Nombre Completo" onChange={handleChange}
                        value={persona.nombreCompleto} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="documento" error={Boolean(errores?.documento)} helperText={(errores?.documento)}
                        className={styles.inputMaterial} label="Documento" onChange={handleChange}
                        value={persona.documento} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="TIPO_DOCUMENTO_PERSONA" error={Boolean(errores?.tipoDocumentoId)}
                        errorMessage={(errores?.tipoDocumentoId)} name="tipoDocumentoId"
                        className={styles.inputMaterial} value={persona.tipoDocumentoId}
                        label="Tipo Documento" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="telefono" error={Boolean(errores?.telefono)} helperText={(errores?.telefono)}
                        className={styles.inputMaterial} label="Telefono" onChange={handleChange}
                        value={persona.telefono} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="ESTADO_ID" error={Boolean(errores?.estadoId)}
                        errorMessage={(errores?.estadoId)} name="estadoId"
                        className={styles.inputMaterial} value={persona.estadoId}
                        label="Estado" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="correo" error={Boolean(errores?.correo)} helperText={(errores?.correo)}
                        className={styles.inputMaterial} label="Correo" onChange={handleChange}
                        value={persona.correo} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectSexo value={persona.sexo} error={Boolean(errores?.sexo)}
                        errorMessage={(errores?.sexo)}
                        name="sexo" className={styles.inputMaterial}
                        onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="TIPO_PERSONA_ID" error={Boolean(errores?.tipoPersonaId)}
                        errorMessage={(errores?.tipoPersonaId)} name="tipoPersonaId"
                        className={styles.inputMaterial} value={persona.tipoPersonaId}
                        label="Tipo Persona" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectDepartamento value={persona.departamentoId} error={Boolean(errores?.departamentoId)}
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
                     <Button type="button" fullWidth variant="contained" size="large" color="secondary" style={style.submit} onClick={abrirCerrarModalInsertar}>Cancelar</Button>
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
                     <TextField error={Boolean(errores?.nroPersona)} helperText={(errores?.nroPersona)} name="nombreCompleto" className={styles.inputMaterial} label="Nombre Completo" onChange={handleChange} value={persona && persona.nombreCompleto}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.documento)} helperText={(errores?.documento)} name="documento" className={styles.inputMaterial} label="Documento" onChange={handleChange} value={persona && persona.documento}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="TIPO_DOCUMENTO_PERSONA" error={Boolean(errores?.tipoDocumentoId)}
                        errorMessage={(errores?.tipoDocumentoId)} name="tipoDocumentoId"
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
                     <SelectSexo value={persona && persona.sexo} error={Boolean(errores?.sexo)}
                        errorMessage={(errores?.sexo)}
                        name="sexo" className={styles.inputMaterial}
                        onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectParametro concepto="TIPO_PERSONA_ID" error={Boolean(errores?.tipoPersonaId)}
                        errorMessage={(errores?.tipoPersonaId)} name="tipopersonaId"
                        className={styles.inputMaterial} value={persona.tipoPersonaId}
                        label="Tipo Persona" onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <SelectDepartamento value={persona && persona.departamentoId} error={Boolean(errores?.departamentoId)}
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
            <Typography className={styles.modalTitle} component="h1" variant="h5" align="center">Estás seguro de {persona.eliminado ? "activar" : "eliminar"} la Persona</Typography>
            <Typography className={styles.modalTitle} component="h1" variant="h5" align="center"><b>{persona.documento} - {persona.nombreCompleto}</b></Typography>
            <Grid container spacing={2} justifyContent="center">
               <Grid item xs={6} md={6}>
                  <Button fullWidth variant="contained" size="large" style={style.submit} 
                  color={persona.eliminado ? "success" : "secondary"}
                  onClick={peticionDelete}>Si</Button>
               </Grid>
               <Grid item xs={6} md={6}>
                  <Button fullWidth variant="contained" size="large"
                   color={persona.eliminado ? "secondary" : "primary"}
                  style={style.submit} onClick={abrirCerrarModalEliminar}>No</Button>
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
                     <Typography align="center" variant='h6' component='h2'>Nombre Completo </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{persona.nombreCompleto}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Tipo Documento</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{persona.tipoDocumento}</Typography>
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
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Tipo Persona</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{persona.tipoPersona}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Departamento</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{persona.departamento}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Estado</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{persona.estado}</Typography>
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
         <Container component="main" maxWidth={false}>
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
                              <SelectParametro concepto="TIPO_PERSONA_ID"
                                 name="filtroTipoPersonaId"
                                 className={styles.inputMaterial}
                                 label="Filtro Tipo Persona" onChange={handleChangeFiltro}
                                 disabled={!checkFiltro.filtroTipoPersonaId}
                                 value={filtro.filtroTipoPersonaId}
                              />
                           </Grid>
                           <Grid item xs={2} md={2}>
                              <Checkbox checked={checkFiltro.filtroTipoPersonaId} className={styles.inputMaterial} style={style.checkFiltro}
                                 onChange={handleCheckFiltro} color='primary' value={checkFiltro.filtroTipoPersonaId} 
                                 name="filtroTipoPersonaId"/>
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
                               <ResponsiveButton onClick={abrirCerrarModalInsertar}/>
                           </Grid>
                        </Grid>
                     </Grid>
                     <TableContainer className={styles.table}>
                        <Table stickyHeader>
                           <TableHead>
                              <TableRow>
                                 <TableCell align='center'>Nombres</TableCell>
                                 <TableCell align='center'>Tipo Doc.</TableCell>
                                 <TableCell align='center'>N° Doc</TableCell>
                                 <Hidden mdDown>
                                    <TableCell align='center'>Sexo</TableCell>
                                 </Hidden>
                                 <TableCell align='center'>Tipo Persona</TableCell>
                                 <TableCell align='center'>Departamento</TableCell>
                                 <TableCell align='center'>Usuario</TableCell>
                                 <TableCell align='center'>Fecha Registro</TableCell>
                                 <TableCell align='center'>Estado</TableCell>
                                 <TableCell align='center'>Acciones</TableCell>
                              </TableRow>
                           </TableHead>

                           <TableBody>
                              {listaPersona.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((persona, index) => (
                                 <TableRow key={persona.personaId} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>
                                    <TableCell size="small" align='center'>{persona.nombreCompleto}</TableCell>

                                    <TableCell size="small" align='center'>{persona.tipoDocumento}</TableCell>

                                    <TableCell size="small" align='center'>{persona.documento}</TableCell>
                                    <Hidden mdDown>
                                       <TableCell size="small" align='center'>{persona.sexo}</TableCell>
                                    </Hidden>
                                    <TableCell size="small" align='center'>{persona.tipoPersona}</TableCell>
                                    <TableCell size="small" align='center'>{persona.departamento}</TableCell>
                                    <TableCell size="small" align='center'>{persona.usuario}</TableCell>
                                    <TableCell size="small" align='center'>{persona.fechaRegistro}</TableCell>
                                    <TableCell size="small" align='center'
                                    style={persona.estado === "Activo"?  {color: "green", fontWeight: "bold"} : { color: "red", fontWeight: "bold"}}>{persona.estado}</TableCell>
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
                                       <IconButton color={persona.eliminado ? "success" : "secondary"} component="span" size="medium" onClick={() => {
                                          limpiarForm();
                                          setPersona(persona);
                                          abrirCerrarModalEliminar()
                                       }}
                                       >
                                          {persona.eliminado ? <CheckCircle/> : <Delete />}
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
         <Modal
            open={modalDetalle}
            onClose={(event, reason) => {
               if (reason !== 'backdropClick') {
                  abrirCerrarModalDetalle();
               }
            }}>
            {bodyDetalle}
         </Modal>
      </React.Fragment >
   );
}

export default Persona;

