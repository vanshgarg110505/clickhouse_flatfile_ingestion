import { useState, useCallback } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Fade,
  useTheme,
  IconButton,
  Divider,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TableChartIcon from '@mui/icons-material/TableChart';
import StorageIcon from '@mui/icons-material/Storage';
import Layout from '../components/Layout';

function FileToClickHouse() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    host: '',
    port: 8123,
    database: '',
    username: '',
    jwtToken: '',
  });
  const [file, setFile] = useState(null);
  const [delimiter, setDelimiter] = useState(',');
  const [headers, setHeaders] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleConfigChange = (event) => {
    setConfig({
      ...config,
      [event.target.name]: event.target.value,
    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    try {
      setLoading(true);
      setError('');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('delimiter', delimiter);

      const response = await axios.post(
        'http://localhost:8080/api/ingestion/flatfile/headers',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setHeaders(response.data);
    } catch (err) {
      setError('Failed to read file headers: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  }, [delimiter]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'text/tab-separated-values': ['.tsv'],
    },
    multiple: false,
  });

  const handlePreview = async () => {
    try {
      setLoading(true);
      setError('');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('delimiter', delimiter);

      const response = await axios.post(
        'http://localhost:8080/api/ingestion/flatfile/preview',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setPreview(response.data);
    } catch (err) {
      setError('Failed to preview data: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    try {
      setLoading(true);
      setError('');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('delimiter', delimiter);

      const response = await axios.post(
        'http://localhost:8080/api/ingestion/flatfile/process',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccess(`Successfully imported ${response.data.count} records!`);
    } catch (err) {
      setError('Failed to import data: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <IconButton 
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{
            fontWeight: 600,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Import from File to ClickHouse
        </Typography>
      </Box>

      {error && (
        <Fade in={true}>
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        </Fade>
      )}

      {success && (
        <Fade in={true}>
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        </Fade>
      )}

      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[2]
          }
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            mb: 3,
            color: 'primary.main'
          }}
        >
          Connection Settings
        </Typography>
        <Box 
          sx={{ 
            display: 'grid', 
            gap: 3, 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'
          }}
        >
          <TextField
            label="Host"
            name="host"
            value={config.host}
            onChange={handleConfigChange}
            required
            fullWidth
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            label="Port"
            name="port"
            type="number"
            value={config.port}
            onChange={handleConfigChange}
            required
            fullWidth
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            label="Database"
            name="database"
            value={config.database}
            onChange={handleConfigChange}
            required
            fullWidth
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            label="Username"
            name="username"
            value={config.username}
            onChange={handleConfigChange}
            required
            fullWidth
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            label="JWT Token"
            name="jwtToken"
            value={config.jwtToken}
            onChange={handleConfigChange}
            required
            type="password"
            fullWidth
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Box>
      </Paper>

      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[2]
          }
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            mb: 3,
            color: 'primary.main'
          }}
        >
          File Upload
        </Typography>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Delimiter</InputLabel>
            <Select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              label="Delimiter"
              sx={{ 
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider'
                }
              }}
            >
              <MenuItem value=",">Comma (,)</MenuItem>
              <MenuItem value="\t">Tab</MenuItem>
              <MenuItem value=";">Semicolon (;)</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          {...getRootProps()}
          sx={{
            border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: isDragActive ? `${theme.palette.primary.main}10` : 'background.paper',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              bgcolor: `${theme.palette.primary.main}10`,
            }
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 48, color: isDragActive ? 'primary.main' : 'text.secondary', mb: 2 }} />
          {isDragActive ? (
            <Typography variant="h6" color="primary.main">Drop the file here...</Typography>
          ) : (
            <Typography variant="h6" color="text.secondary">
              Drag and drop a file here, or click to select a file
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Supported formats: CSV, TSV
          </Typography>
        </Box>
        {file && (
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
            <StorageIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography>
              Selected file: <strong>{file.name}</strong>
            </Typography>
          </Box>
        )}
      </Paper>

      {headers.length > 0 && (
        <Fade in={true}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              mb: 4,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[2]
              }
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                mb: 3,
                color: 'primary.main'
              }}
            >
              File Headers
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1,
                mb: 3,
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 1
              }}
            >
              {headers.map((header) => (
                <Box 
                  key={header}
                  sx={{ 
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  {header}
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handlePreview}
                disabled={loading}
                startIcon={<TableChartIcon />}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Preview Data'}
              </Button>
              <Button
                variant="contained"
                onClick={handleImport}
                disabled={loading}
                startIcon={<StorageIcon />}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Import Data'}
              </Button>
            </Box>
          </Paper>
        </Fade>
      )}

      {preview.length > 0 && (
        <Fade in={true}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              mb: 4,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[2]
              }
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                mb: 3,
                color: 'primary.main'
              }}
            >
              Data Preview
            </Typography>
            <TableContainer 
              sx={{ 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                maxHeight: 400
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableCell 
                        key={header}
                        sx={{ 
                          fontWeight: 600,
                          bgcolor: 'primary.main',
                          color: 'white'
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {preview.map((row, index) => (
                    <TableRow 
                      key={index}
                      sx={{ 
                        '&:nth-of-type(odd)': { bgcolor: 'background.default' },
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Fade>
      )}
    </Layout>
  );
}

export default FileToClickHouse; 