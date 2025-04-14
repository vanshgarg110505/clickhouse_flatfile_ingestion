import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StorageIcon from '@mui/icons-material/Storage';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function Navbar() {
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        background: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <RouterLink to="/" style={{ textDecoration: 'none' }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            ClickHouse FlatFile Ingestion Tool
          </Typography>
        </RouterLink>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/clickhouse-to-file"
            startIcon={<FileUploadIcon />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              color: 'text.primary',
              '&:hover': {
                background: `${theme.palette.primary.main}10`,
              }
            }}
          >
            ClickHouse to File
          </Button>
          <Button
            component={RouterLink}
            to="/file-to-clickhouse"
            startIcon={<StorageIcon />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              color: 'text.primary',
              '&:hover': {
                background: `${theme.palette.secondary.main}10`,
              }
            }}
          >
            File to ClickHouse
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 