import { Typography, Grid, Card, CardContent, CardActions, Button, Box, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StorageIcon from '@mui/icons-material/Storage';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Layout from '../components/Layout';

function Home() {
  const theme = useTheme();

  return (
    <Layout>
      <Box textAlign="center" mb={6}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 3
          }}
        >
          ClickHouse FlatFile Ingestion Tool
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
        >
          Transfer data seamlessly between ClickHouse databases and flat files (CSV, TSV, etc.)
          in both directions with our modern, intuitive interface.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4]
              },
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <FileUploadIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" component="h2" fontWeight="600">
                  ClickHouse to File
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Export data from your ClickHouse database to a flat file format of your choice.
                Select tables, columns, and configure the export format with ease.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 3, pt: 0 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                component={RouterLink}
                to="/clickhouse-to-file"
                startIcon={<FileUploadIcon />}
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                Start Export
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card 
            elevation={0}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4]
              },
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <StorageIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                <Typography variant="h5" component="h2" fontWeight="600">
                  File to ClickHouse
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Import data from flat files into your ClickHouse database.
                Easily configure file formats and map columns to your target tables.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 3, pt: 0 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                component={RouterLink}
                to="/file-to-clickhouse"
                startIcon={<StorageIcon />}
                color="secondary"
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                Start Import
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Home; 