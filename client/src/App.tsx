import { Routes, Route, Navigate  } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import PrivateRoute from './routes/PrivateRoute';

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    <Route path="/add-task" element={<PrivateRoute><AddTask /></PrivateRoute>} />
    <Route path="/edit-task/:id" element={<PrivateRoute><EditTask /></PrivateRoute>} />
  </Routes>
);

export default App;