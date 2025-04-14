import { Box, Container, useTheme } from '@mui/material';
import Navbar from './Navbar';

function Layout({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: `linear-gradient(45deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          overflowY: 'auto',
          pt: 3,
          pb: 6
        }}
      >
        <Container 
          maxWidth="lg"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export default Layout; 