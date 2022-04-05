import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons/';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { style, styleModal } from '../tools/style'
import axios from 'axios';

function Departamento() {
   const styles = styleModal();

   const [departamento, setDepartamento] = useState({
      DepartamentoId: 0,
      Habitaciones: 0,
      propietario: '',
      Area: 0,
      Estado: '',
      NroEdificio: 0

   })
   const [modalInsertar, setModalInsertar] = useState(false);

   const peticionGet = async () => {
      // await axios.get(baseUrl)
      //    .then(response => {
      //       setDepartamento(response.departamento);
      //    })
   }
   const PeticionPost = async () => {
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
   // useEffect(async () => {
   //    //await peticionGet();
   // }, [])

   const bodyInsertar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Registrar Departamento</Typography>
            <form className={styles.modalForm}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <TextField name="Propietario" className={styles.inputMaterial} label="Propietario" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="Habitaciones" className={styles.inputMaterial} label="Numero de Habitaciones" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="Area" className={styles.inputMaterial} label="Area" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="Estado" className={styles.inputMaterial} label="Estado" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="NroEdificio" className={styles.inputMaterial} label="Numero de Edificio" onChange={handleChange} />
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
         <Typography className={styles.modalTitle} component="h1" variant="h5">Editar Departamento</Typography>
         <form className={styles.modalForm}>
           <Grid container spacing={2} justifyContent="center">
           <Grid item xs={12} md={12}>
         <TextField name="Propietario" className={styles.inputMaterial} label="Propietario" onChange={handleChange} value={departamento && departamento.propietario}></TextField>
             </Grid>
             <Grid item xs={12} md={6}>
         <TextField name="Habitaciones" className={styles.inputMaterial} label="Habitaciones" onChange={handleChange} value={departamento && departamento.Habitaciones}></TextField>
               </Grid>
              <Grid item xs={12} md={6}>
         <TextField name="Area" className={styles.inputMaterial} label="Area" onChange={handleChange} value={departamento && departamento.Area}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
         <TextField name="Estado" className={styles.inputMaterial} label="Estado" onChange={handleChange} value={departamento && departamento.Estado}></TextField>
                </Grid>
                  <Grid item xs={12} md={6}>
            <TextField name="NroEdificio" className={styles.inputMaterial} label="Nro de Edificio" onChange={handleChange} value={departamento && departamento.NroEdificio}></TextField>
              </Grid>                  
             </Grid>
             <Grid container spacing={2} justifyContent="center">
             <Grid item xs={6} md={6}>
           <Button color="primary" onClick={()=>PeticionPut()}>Editar</Button>
           </Grid>
           <Grid item xs={6} md={6}>
           <Button onClick={()=>abriCerrarModalEditar()}>Cancelar</Button>
           </Grid>
           </Grid>
          </form>
          </Container>
      </div>
      
   )

   const bodyEliminar=(
      <div className={styles.modal}>
         <p>Estas seguro que deseas eliminar el departamento seleccionado<b>{departamento && departamento.DepartamentoId}</b></p>
         <Grid container spacing={2} justifyContent="center">
         <Grid item xs={6} md={6}>
              <Button color="secondary" onClick={()=>peticionDelete()}>Si</Button>
              </Grid>
              <Grid item xs={6} md={6}>
              <Button onClick={()=>abrirCerrarModalEliminar()}></Button>
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
                     <TableCell>Id Departamento</TableCell>
                     <TableCell>Numero de Habitaciones</TableCell>
                     <TableCell>Propietario</TableCell>
                     <TableCell>Area</TableCell>
                     <TableCell>Estado</TableCell>
                     <TableCell>Numero de Edificio</TableCell>
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
export default Departamento;

