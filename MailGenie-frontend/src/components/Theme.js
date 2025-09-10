import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#532190',
            light: '#3F248F',
            dark: '#9E34B1'
        },
        secondary: {
            main: '#52379F',
            light: '#823BA0',
            dark: '#842B94'
        },
        background: {
            default: '#3498DB',
            paper: '#FFFFFF'
        },
        text: {
            primary: '#283590',
            secondary: '#000'
        }
    },
    typography: {
        fontFamily: 'Verdana',
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.5px'
        },
        body1: {
            lineHeight: 1.6
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontWeight: 600
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)'
                    }
                }
            }
        }
    }
});

export default theme;