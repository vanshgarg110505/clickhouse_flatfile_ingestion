import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import ClickHouseToFile from './pages/ClickHouseToFile';
import FileToClickHouse from './pages/FileToClickHouse';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clickhouse-to-file" element={<ClickHouseToFile />} />
          <Route path="/file-to-clickhouse" element={<FileToClickHouse />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
