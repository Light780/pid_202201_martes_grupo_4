import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {StateProvider} from './context/store'
import { initialState } from './context/initialState';
import {mainReducer} from './context/reducers'
import { StyledEngineProvider } from '@mui/material';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(  
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={mainReducer}>
            <StyledEngineProvider injectFirst>                
                <App />                    
            </StyledEngineProvider>
        </StateProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
