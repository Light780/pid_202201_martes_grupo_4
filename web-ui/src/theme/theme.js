import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles'
import createBreakpoints from "@mui/system/createTheme/createBreakpoints";
const breakpoints = createBreakpoints({
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
});
const theme = createTheme({
    palette: {
        primary: {
            light: "#63a4fff",
            main: "#1976d2",
            dark: "#004ba0",
            contrastText: "#ecfad8"
        },
        secondary: red            
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    [breakpoints.up('md')]: {
                        fontSize: '13px'
                    }
                },
                stickyHeader: {
                    fontWeight: "bold"
                }
            }
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    [breakpoints.down('md')]: {
                        width: "max-content"
                    }
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'standard'
            }
        },
        MuiSelect: {
            defaultProps: {
                variant: 'standard'
            }
        },
        MuiFormControl: {
            defaultProps: {
                variant: 'standard'
            }
        }

    }
})
export default theme;