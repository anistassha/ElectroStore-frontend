import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Products from './pages/Products';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './products/AddProduct';
import EditProduct from './products/EditProduct';
import Register from './components/Register';
import Login from './components/Login';
import CustomersPage from './pages/CustomersPage';
import PurchasesPage from './pages/PurchasesPage';
import SalesReportPage from './pages/SalesReportPage';
import TopSellersReportButton from './pages/TopSellersReportButton';
import WeeklyReportButton from './pages/WeelkyReportButton';
import ReportsPage from './pages/ReportsPage';
import EmployeesPage from './pages/EmployeesPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/editproduct/:id" element={<EditProduct />} />
          <Route exact path="/customers" element={<CustomersPage />} />
          <Route exact path="/api/purchases" element={<PurchasesPage />} />
          <Route exact path="/api/purchases/report" element={<SalesReportPage />} />
          <Route exact path="/report/top-sellers" element={<TopSellersReportButton />} />
          <Route exact path="/report/weekly" element={<WeeklyReportButton />} />
          <Route exact path="/reports" element={<ReportsPage />} />
          <Route exact path="/employees" element={<EmployeesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;