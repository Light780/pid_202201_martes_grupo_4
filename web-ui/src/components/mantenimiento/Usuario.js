import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel, Hidden, IconButton } from '@material-ui/core';
import { Edit, Delete, Info } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { style, styleModal } from '../tools/style'
import { loginUsuario, obtenerUsuario, actualizarUsuario, eliminarUsuario, } from '../../actions/UsuarioAction';
import { useStateValue } from '../../context/store';
function Usuario() {
   const styles = styleModal();
   const [{ sesionUsuario }, dispatch] = useStateValue()
   const [listaUsua, setListaUsuario] = useState([])
   const [usuario, setUsuario] = useState({

      usuarioId: 0,
      username: '',
      nombreusuario:'',
      emailusuario:'',
      fotousuario:''
  
   })


   const [errores, setErrores] = useState({})
   const [modalInsertar, setModalInsertar] = useState(false);
   const [modalEditar, setModalEditar] = useState(false);
   const [modalEliminar, setModalEliminar] = useState(false);
   const [modalDetalle, setModalDetalle] = useState(false);

  
   const limpiarForm = () => {
      setUsuario({
         usuarioId: 0,
      username: '',
      nombreusuario:'',
      emailusuario:'',
      fotousuario:''
      })
      setErrores({})
    }
    departamento
   
   const peticionPut = e => {
      e.preventDefault()
      actualizarUsuario(usuario).then(respuesta => {
         if (respuesta.status === 200) {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: "Usuario actualizado correctamente",
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
                  mensaje: "Error al actualizar el Usuario, Detalles del error : " + Object.values(respuesta.response.data.errores),
                  severity: 'error'
               }
            })
         }
      })
   }

   const peticionDelete = e => {
      e.preventDefault()
      eliminarUsuario(usuario.usuarioId).then(respuesta => {
         if (respuesta.status === 200) {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: "Usuario eliminado correctamente",
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
                  mensaje: "Error al eliminar el Usuario",
                  severity: 'error'
               }
            })
         }
      })
   }
   const peticionUnico = (usuario) => {
      obtenerUsuario(usuario.usuarioId).then(respuesta => {
         if (respuesta.status === 200) {
            setUsuario(respuesta.data)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: "Error al consultar el Usuario",
                  severity: 'error'
               }
            })
         }
      })
   }

   const handleCheck = e => {
    const { name, value } = e.target
    setUsuario(anterior => ({
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

 const bodyEditar = (
    <div className={styles.modal}>
       <Container component="main" maxWidth="md" justifyContent="center">
          <Typography className={styles.modalTitle} component="h1" variant="h5">Editar Usuario</Typography>
          <form className={styles.modalForm}>
             <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={12}>
                   <TextField error={Boolean(errores?.username)} helperText={(errores?.username)} name="username" className={styles.inputMaterial} label="Username" onChange={handleChange} value={usuario && usuario.username}></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                   <TextField error={Boolean(errores?.nombreusuario)} helperText={(errores?.nombreusuario)} name="nombreusuario" className={styles.inputMaterial} label="Nombre Conpleto" onChange={handleChange} value={nombreusuario && usuario.nombreusuario}></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                   <TextField error={Boolean(errores?.emailusuario)} helperText={(errores?.emailusuario)} name="emailusuario" className={styles.inputMaterial} label="Email" onChange={handleChange} value={usuario && usuario.emailusuario}></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                   <TextField error={Boolean(errores?.fotousuario)} helperText={(errores?.fotousuario)} name="fotousuario" className={styles.inputMaterial} label="Foto" onChange={handleChange} value={usuario && usuario.fotousuario}></TextField>
                </Grid>
             </Grid>
          </form>
       </Container>
    </div>

 )



 const bodyDetalle = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Detalle Usuario </Typography>
            <div style={style.detail}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Username</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{usuario.username}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Nombres</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{usuario.nombreusuario}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Email</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{usuario.emailusuario}m2</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>Foto de Perfil</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Typography align="center" variant='h6' component='h2'>{usuario.fotousuario}</Typography>
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

 const bodyEliminar = (
    <div className={styles.modal}>
       <p>Estas seguro que deseas eliminar el usuario seleccionado<b>{usuario && usuario.usuarioId}</b></p>
       <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} md={6}>
             <Button color="secondary" onClick={peticionDelete}>Si</Button>
          </Grid>
          <Grid item xs={6} md={6}>
             <Button onClick={abrirCerrarModalEliminar}></Button>
          </Grid>
       </Grid>
       
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
export default Usuario;
