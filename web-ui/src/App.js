import React, { useEffect, useState} from 'react'
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Grid, Snackbar, ThemeProvider } from '@material-ui/core';
import theme from './theme/theme'
import AppNavBar from './components/shared/AppNavbar'
import Inicio from './components/Inicio';
import Login from './components/security/Login';
import SecurePath from './components/shared/SecurePath'
import { useStateValue } from './context/store';
import { obtenerUsuario } from './actions/UsuarioAction';
import { Alert } from '@material-ui/lab';
import Prueba from './components/mantenimientos/Prueba';
function App() {
  const [{sesionUsuario, openSnackBar}, dispatch] = useStateValue()
  const [iniciaApp, setIniciaApp] = useState(false);
  useEffect(() => {
    if (!iniciaApp) {
       obtenerUsuario(window.localStorage.getItem("id"),dispatch).then(() => {
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
      <Router>
        <ThemeProvider theme={theme}>
          <AppNavBar/>
          <Grid container>
            <Routes>
              <Route exact path='/auth/login' element= {<Login/>}/>
              <Route exact path='/' element= {<SecurePath><Inicio/></SecurePath>}/>
              <Route exact path='/mantenimiento/prueba' element= {<SecurePath><Prueba/></SecurePath>}/>
              <Route exact path='/mantenimiento/propietario' element= {<Inicio/>}/>
              <Route exact path='/mantenimiento/propietario' element= {<Inicio/>}/>              
            </Routes>
          </Grid>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
