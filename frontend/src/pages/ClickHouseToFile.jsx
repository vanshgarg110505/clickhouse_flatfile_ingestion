import { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
  Alert,
  CircularProgress,
  OutlinedInput,
  Container,
  Fade,
  useTheme,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function ClickHouseToFile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    host: '',
    port: 8123,
    database: '',
    username: '',
    jwtToken: '',
  });
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleConfigChange = (event) => {
    setConfig({
      ...config,
      [event.target.name]: event.target.value,
    });
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('http://localhost:8080/api/ingestion/clickhouse/tables', config);
      setTables(response.data);
      setSuccess('Connected successfully!');
    } catch (err) {
      setError('Failed to connect to ClickHouse: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = async (event) => {
    const table = event.target.value;
    setSelectedTable(table);
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('http://localhost:8080/api/ingestion/clickhouse/columns', {
        ...config,
        table,
      });
      setColumns(response.data);
      setSelectedColumns([]);
    } catch (err) {
      setError('Failed to fetch columns: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleColumnSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedColumns(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post(
        'http://localhost:8080/api/ingestion/clickhouse/export',
        {
          ...config,
          table: selectedTable,
        },
        {
          params: { columns: selectedColumns },
        }
      );
      setSuccess(`Successfully exported ${response.data.count} records!`);
    } catch (err) {
      setError('Failed to export data: ' + (err.response?.data || err.message));
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
          Export from ClickHouse to File
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
        <Button
          variant="contained"
          onClick={handleConnect}
          disabled={loading}
          sx={{ 
            mt: 4,
            py: 1.5,
            px: 4,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem'
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Connect to Database'}
        </Button>
      </Paper>

      {tables.length > 0 && (
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
              Select Table
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Table</InputLabel>
              <Select
                value={selectedTable}
                onChange={handleTableSelect}
                label="Table"
                sx={{ 
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider'
                  }
                }}
              >
                {tables.map((table) => (
                  <MenuItem key={table} value={table}>
                    {table}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Fade>
      )}

      {columns.length > 0 && (
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
              Select Columns
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Columns</InputLabel>
              <Select
                multiple
                value={selectedColumns}
                onChange={handleColumnSelect}
                input={<OutlinedInput label="Columns" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                sx={{ 
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider'
                  }
                }}
              >
                {columns.map((column) => (
                  <MenuItem key={column} value={column}>
                    <Checkbox checked={selectedColumns.indexOf(column) > -1} />
                    <ListItemText primary={column} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleExport}
              disabled={loading || selectedColumns.length === 0}
              sx={{ 
                mt: 4,
                py: 1.5,
                px: 4,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Export Selected Columns'}
            </Button>
          </Paper>
        </Fade>
      )}
    </Layout>
  );
}

export default ClickHouseToFile; 