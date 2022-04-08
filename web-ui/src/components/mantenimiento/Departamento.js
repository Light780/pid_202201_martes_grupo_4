import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel, Hidden, IconButton } from '@material-ui/core';
import { Edit, Delete, Info } from '@material-ui/icons/';
import React, { useState, useEffect } from 'react';
import { style, styleModal } from '../tools/style'
import { listarDepartamento, registrarDepartamento, actualizarDepartamento, borrarDepartamento, consultarUnico } from '../../actions/DepartamentoAction';
import { useStateValue } from '../../context/store';
function Departamento() {
   const styles = styleModal();
   const [{ sesionUsuario }, dispatch] = useStateValue()
   const [listaDepa, setListaDepa] = useState([])
   const [departamento, setDepartamento] = useState({
      departamentoId: 0,
      nroDepartamento: '',
      tamano: 0.00,
      tipoDepaId: 0,
      estadoDepaId: 0,
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

   const peticionGet = () => {
      listarDepartamento().then(respuesta => {
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
         estadoDepaId: 0,
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
      if (Object.keys(errores).length === 0) {         
         e.preventDefault()
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
               peticionGet()
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
            peticionGet()
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
   const peticionUnico = (departamento) => {
      consultarUnico(departamento.departamentoId).then(respuesta => {
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
   const validarForm = (control) => {
      const { name, value } = control
      switch (name) {
         case "nroDepartamento":
            if (value === '') {
               setErrores(anterior => ({
                  ...anterior,
                  [name]: 'El campo es obligatorio'
               }))
            }
            else if (!/^[0-9]+$/.test(value)) {
               setErrores(anterior => ({
                  ...anterior,
                  [name]: 'Debe ser numérico'
               }))
            }
            else if (value.trim().length !== 3) {
               setErrores(anterior => ({
                  ...anterior,
                  [name]: 'Debe tener 3 caracteres'
               }))
            }
            else delete errores.nroDepartamento
            break;
         case "tamano":
            if (value === '') {
               setErrores(anterior => ({
                  ...anterior,
                  [name]: 'El campo es obligatorio'
               }))
            }
            else if (!/^[0-9.]+$/.test(value)) {
               setErrores(anterior => ({
                  ...anterior,
                  [name]: 'Debe ser numérico'
               }))
            }
            else if (value <= 0) {
               setErrores(anterior => ({
                  ...anterior,
                  [name]: 'Debe ser mayor a 0'
               }))
            }
            else delete errores.tamano
            break;
         case "tipoDepaId":
            if (value <= 0) {
               setErrores(anterior => ({
                  ...anterior,
                  [name]: 'Seleccione una opcion'
               }))
            }
            else delete errores.tipoDepaId
            break;
         case "estadoDepaId":
            if (value <= 0) {
               setErrores(anterior => ({
                  ...anterior,
                  [name]: 'Seleccione una opcion'
               }))
            }
            else delete errores.tipoDepaId
            break;
         case "cantidadHabitaciones":
            if (value <= 0) {
               setErrores(anterior => ({
                  ...anterior,
                  [name]: 'Debe ser mayor a 0'
               }))
            }
            else delete errores.tipoDepaId
            break;
      }
   }
   const handleChange = e => {
      const { name, value } = e.target
      setDepartamento(anterior => ({
         ...anterior,
         [name]: value
      }))
      validarForm(e.target)
   }
   const handleCheck = e => {
      const { name, value } = e.target
      setDepartamento(anterior => ({
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
            <Typography className={styles.modalTitle} component="h1" variant="h5">Registrar Departamento</Typography>
            <form className={styles.modalForm}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <TextField error={Boolean(errores?.nroDepartamento)} helperText={(errores?.nroDepartamento)} required name="nroDepartamento" className={styles.inputMaterial} label="Nro de Departamento" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.tamano)} helperText={(errores?.tamano)} required name="tamano" type="number" className={styles.inputMaterial} label="Area" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.tipoDepaId)} helperText={(errores?.tipoDepaId)} required name="tipoDepaId" type="number" className={styles.inputMaterial} label="Tipo de Departamento" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.estadoDepaId)} helperText={(errores?.estadoDepaId)} required name="estadoDepaId" type="number" className={styles.inputMaterial} label="Estado Deparatamento" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.cantidadHabitaciones)} helperText={(errores?.cantidadHabitaciones)} required name="cantidadHabitaciones" type="number" className={styles.inputMaterial} label="Cantidad de Habitaciones" onChange={handleChange} />
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
                     <Button type="button" fullWidth variant="contained" size="large" color="secondary" style={style.submit} onClick={abrirCerrarModalInsertar}>Cancelar</Button>
                  </Grid>
               </Grid>
            </form>
         </Container>

      </div>
   )
   const bodyEditar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Editar Departamento</Typography>
            <form className={styles.modalForm}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <TextField error={Boolean(errores?.nroDepartamento)} helperText={(errores?.nroDepartamento)} name="nroDepartamento" className={styles.inputMaterial} label="NroDepartamento" onChange={handleChange} value={departamento && departamento.nroDepartamento}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.tamano)} helperText={(errores?.tamano)} name="tamano" className={styles.inputMaterial} label="Area" onChange={handleChange} value={departamento && departamento.tamano}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.tipoDepaId)} helperText={(errores?.tipoDepaId)} name="tipoDepaId" className={styles.inputMaterial} label="TipoDepaId" onChange={handleChange} value={departamento && departamento.tipoDepaId}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField error={Boolean(errores?.estadoDepaId)} helperText={(errores?.estadoDepaId)} name="estadoDepaId" className={styles.inputMaterial} label="EstadoDepaId" onChange={handleChange} value={departamento && departamento.estadoDepaId}></TextField>
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
         <p>Estas seguro que deseas eliminar el departamento seleccionado<b>{departamento && departamento.departamentoId}</b></p>
         <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6} md={6}>
               <Button color="secondary" onClick={peticionDelete}>Si</Button>
            </Grid>
            <Grid item xs={6} md={6}>
               <Button onClick={abrirCerrarModalEliminar}></Button>
            </Grid>
         </Grid>
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
                     <Typography align="center" variant='h6' component='h2'>{departamento.tipoDepaId}</Typography>
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
                     <Typography align="center" variant='h6' component='h2'>{departamento.estadoDepaId}</Typography>
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
      <div className={styles.table}>
         <Grid container justify="flex-end">
            <Button type="button" variant="contained" size="large" color="primary" style={style.submit} onClick={abrirCerrarModalInsertar}>
               Registrar
            </Button>
         </Grid>
         <TableContainer component={Paper}>
            <Table>
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
                  {listaDepa.map(departamento => (
                     <TableRow key={departamento.departamentoId}>
                        <TableCell align='center'>{departamento.nroDepartamento}</TableCell>
                        <TableCell align='center'>{departamento.tipoDepaId}</TableCell>
                        <Hidden mdDown>
                           <TableCell align='center'>{departamento.cantidadHabitaciones}</TableCell>
                           <TableCell align='center'>{departamento.tamano}</TableCell>
                        </Hidden>
                        <TableCell align='center'>{departamento.estadoDepaId}</TableCell>
                        <TableCell align='center'>
                           <IconButton color="primary" component="span" size="medium" onClick={() => { peticionUnico(departamento); abrirCerrarModalEditar() }}>
                              <Edit />
                           </IconButton>
                           <IconButton color="default" component="span" size="medium" onClick={() => { peticionUnico(departamento); abrirCerrarModalDetalle() }}>
                              <Info />
                           </IconButton>
                           <IconButton color="secondary" component="span" size="medium" onClick={abrirCerrarModalEliminar}>
                              <Delete />
                           </IconButton>
                        </TableCell>
                     </TableRow>
                  ))}

               </TableBody>
            </Table>
         </TableContainer>

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


   );
}
export default Departamento;

