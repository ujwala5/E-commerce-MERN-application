import LoginPage from './Component/LoginPage';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './Routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={5000} />
      {/* <LoginPage /> */}
      <AppRoutes />
    </div>
  );
}

export default App;