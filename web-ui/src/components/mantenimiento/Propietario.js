import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons/';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { style, useStyles } from '../tools/style'
import axios from 'axios';

function Propietario() {
   const styles = useStyles();

   const [propietario, setPropietario] = useState({
      DNI: 0,
      propietario: '',
      Apellido: '',
      Familiares: 0,
      Telefono: 0,
      Correo: 0

   })
   const [modalInsertar, setModalInsertar] = useState(false);
   const [modalEditar, setModalEditar] = useState(false);
   const [modalEliminar, setModalEliminar] = useState(false);

   const PeticionGet = async () => {
      
   }
   const PeticionPost = async () => {
      
   }
   const PeticionPut = async () => {
      // await axios.get(baseUrl)
      //    .then(response => {
      //       setDepartamento(response.departamento);
      //    })
   }
   const PeticionDelete = async () => {
      // await axios.get(baseUrl)
      //    .then(response => {
      //       setDepartamento(response.departamento);
      //    })
   }
   const abrirCerrarModalInsertar = () => {
      setModalInsertar(!modalInsertar);
   }
   const handleChange = e => {

   }
   const abrirCerrarModalEditar=()=>{
      setModalEditar (!modalEditar);
   }
   const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
   }
  

   const bodyInsertar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Registrar Propietario</Typography>
            <form className={styles.modalForm}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <TextField name="DNI" className={styles.inputMaterial} label="DNI" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="propietario" className={styles.inputMaterial} label="Propietario" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="Apellido" className={styles.inputMaterial} label="Apellido" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="Familiares" className={styles.inputMaterial} label="Familiares" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="Telefono" className={styles.inputMaterial} label="Telefono" onChange={handleChange} />
                  </Grid>        
                  <Grid item xs={12} md={6}>
                     <TextField name="Correo" className={styles.inputMaterial} label="Correo" onChange={handleChange} />
                  </Grid>          
               </Grid>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} md={6}>
                     <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit} onClick={() => PeticionPost()}>
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
   const bodyEditar=(
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
         <Typography className={styles.modalTitle} component="h1" variant="h5">Editar Propietario</Typography>
         <form className={styles.modalForm}>
           <Grid container spacing={2} justifyContent="center">
           <Grid item xs={12} md={12}>
         <TextField name="DNI" className={styles.inputMaterial} label="DNI " onChange={handleChange} value={propietario && propietario.DNI}></TextField>
             </Grid>
             <Grid item xs={12} md={6}>
         <TextField name="Habitaciones" className={styles.inputMaterial} label="Habitaciones" onChange={handleChange} value={propietario && propietario.propietario}></TextField>
               </Grid>
              <Grid item xs={12} md={6}>
         <TextField name="Apellido" className={styles.inputMaterial} label="Apellido" onChange={handleChange} value={propietario && propietario.Apellido}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
         <TextField name="Familiares" className={styles.inputMaterial} label="Familiares" onChange={handleChange} value={propietario && propietario.Familiares}></TextField>
                </Grid>
                  <Grid item xs={12} md={6}>
            <TextField name="Telefono" className={styles.inputMaterial} label="Telefono" onChange={handleChange} value={propietario && propietario.Telefono}></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
            <TextField name="Correo" className={styles.inputMaterial} label="Correo" onChange={handleChange} value={propietario && propietario.Correo}></TextField>
              </Grid>
              </Grid>
             <Grid container spacing={2} justifyContent="center">
             <Grid item xs={6} md={6}>
           <Button color="primary" onClick={()=>PeticionPut()}>Editar</Button>
           </Grid>
           <Grid item xs={6} md={6}>
           <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>
           </Grid>
           </Grid>
          </form>
          </Container>
      </div>
      
   )

   const bodyEliminar=(
      <div className={styles.modal}>
         <p>Estas seguro que deseas eliminar el propietario seleccionado<b>{propietario && propietario.propietario}</b></p>
         <Grid container spacing={2} justifyContent="center">
         <Grid item xs={6} md={6}>
              <Button color="secondary" onClick={()=>PeticionDelete()}>Si</Button>
              </Grid>
              <Grid item xs={6} md={6}>
              <Button onClick={abrirCerrarModalEliminar}></Button>
              </Grid>
              </Grid>
         </div>
     
   )


   return (
      <div className={styles.table}>
         <Grid container justify="flex-end">
            <Button type="button"  variant="contained" size="large" color="primary" style={style.submit} onClick={abrirCerrarModalInsertar}>
               Registrar
            </Button>
         </Grid>
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>DNI</TableCell>
                     <TableCell>Propietario</TableCell>
                     <TableCell>Apellido</TableCell>
                     <TableCell>Familiares</TableCell>
                     <TableCell>Telefono</TableCell>
                     <TableCell>Correo</TableCell>
                     <TableCell>Acciones</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>
                  <TableRow key={1}>
                     <TableCell>{1}</TableCell>
                     <TableCell>{3}</TableCell>
                     <TableCell>{'Alan Becker'}</TableCell>
                     <TableCell>{250}</TableCell>
                     <TableCell>{'Activo'}</TableCell>
                     <TableCell>{15}</TableCell>
                     <TableCell>
                        <Edit />
                        &nbsp;&nbsp;&nbsp;
                        <Delete />
                     </TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </TableContainer>

         <Modal
            open={modalInsertar}
            onClose={abrirCerrarModalInsertar}>
            {bodyInsertar}
         </Modal>

         <Modal
         open={modalEditar}
         onClose={abrirCerrarModalEditar}>
            {bodyEditar}
         </Modal>

         <Modal
         open={modalEliminar}
         onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
         </Modal>
      </div>


   );
}
export default Propietario;

