import React from 'react'
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Grid, ThemeProvider } from '@material-ui/core';
import theme from './theme/theme'
import AppNavBar from './components/shared/AppNavbar'
import Inicio from './components/Inicio';
import Login from './components/security/Login';
function App() {
  return (
    <React.Fragment>
      <Router>
        <ThemeProvider theme={theme}>
          <AppNavBar/>
          <Grid container>
            <Routes>
              <Route exact path='/auth/login' element= {<Login/>}/>
              <Route exact path='/' element= {<Inicio/>}/>
              <Route exact path='/mantenimiento/departamento' element= {<Inicio/>}/>
              <Route exact path='/mantenimiento/propietario' element= {<Inicio/>}/>
            </Routes>
          </Grid>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
