import React, { useEffect, useState } from 'react'
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Grid, Snackbar, ThemeProvider } from '@mui/material';
import theme from './theme/theme'
import AppNavbar from './components/shared/AppNavbar'
import Inicio from './components/Inicio';
import Login from './components/security/Login';
import SecurePath from './components/shared/SecurePath'
import { useStateValue } from './context/store';
import { obtenerUsuario } from './actions/UsuarioAction';
import { Alert } from '@mui/lab';
import PerfilUsuario from './components/security/PerfilUsuario';
import Departamento from './components/mantenimiento/Departamento';
import Persona from './components/mantenimiento/Persona';
import Mascota from './components/mantenimiento/Mascota';
import RegistroVisita from './components/visita/RegistroVisita';
import ConsultaVisita from './components/visita/ConsultaVisita';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import GenerarBoleta from './components/servicios/GenerarBoleta';

import RegistrarIncidencia from './components/incidencias/RegistrarIncidencia';

function App() {
  const [{ sesionUsuario, openSnackBar }, dispatch] = useStateValue()
  const [iniciaApp, setIniciaApp] = useState(false);
  useEffect(() => {
    if (!iniciaApp) {
      obtenerUsuario(window.localStorage.getItem("id"), dispatch).then(() => {
        setIniciaApp(true);
      }).catch(error => {
        setIniciaApp(true);
        console.log(error);
      });
    }
  }, [iniciaApp])

  return iniciaApp === false ? null :
  (
    <React.Fragment>
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackBar ? openSnackBar.open : false}
        autoHideDuration={3000}
        onClose={() => dispatch({ type: "OPEN_SNACKBAR", openMensaje: { open: false, mensaje: '', severity: '' } })}>
        <Alert variant="filled" severity={openSnackBar ? openSnackBar.severity : ''}>
          {openSnackBar ? openSnackBar.mensaje : ''}
        </Alert>
      </Snackbar>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppNavbar/>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container>
            <Routes>
              <Route exact path='/auth/login' element= {<Login/>}/>
              <Route exact path='/' element= {<SecurePath><Inicio/></SecurePath>}/>              
              <Route exact path='/auth/perfil' element= {<SecurePath><PerfilUsuario/></SecurePath>}/>
              <Route exact path='/mantenimiento/departamento' element= {<SecurePath><Departamento/></SecurePath>}/>
              <Route exact path='/mantenimiento/persona' element= {<SecurePath><Persona/></SecurePath>}/>      
              <Route exact path='/mantenimiento/mascota' element= {<SecurePath><Mascota/></SecurePath>}/>    
              <Route exact path='/visita/registro' element= {<SecurePath><RegistroVisita/></SecurePath>}/>
              <Route exact path='/visita/consultaVisita' element= {<SecurePath><ConsultaVisita/></SecurePath>}/>
              <Route exact path='/servicio/generarBoletas' element= {<SecurePath><GenerarBoleta/></SecurePath>}/>
              <Route exact path='/incidencia/registrarIncidencia' element= {<SecurePath><RegistrarIncidencia/></SecurePath>}/>
            </Routes>
          </Grid>
          </LocalizationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
