import {createTheme} from '@material-ui/core/styles'
const theme = createTheme({
    palette:{
        primary:{
            light:"#63a4fff",
            main:"#1976d2",
            dark:"#004ba0",
            contrastText:"#ecfad8"
        }
    },
    overrides:{    
        MuiTableCell:{
            root:{
                fontSize:'13px'
            },
            stickyHeader:{
                fontWeight:"bold"
            }
        }        
    }
})
export default theme;