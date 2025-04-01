import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';
import POSList from '../po/POSList/POSList';
import Sales from '../po/Sales/Sales';
import POSReceipts from '../po/Receipts/Receipts';

// Import all your dashboard components here
import SalesSummary from '../Reports/SalesSummary';
import ItemList from '../Items/ItemList';
import Categories from '../Items/Categories';
import Modifiers from '../Items/Modifiers';
import ItemDiscounts from '../Items/Discounts';
// ... import other components

// Import all report components
import SalesByItem from '../Reports/SalesByItem';
import SalesCategory from '../Reports/SalesCategory';
import SalesByEmployee from '../Reports/SalesByEmployee';
import SalesByPayment from '../Reports/SalesByPayment';
import ReceiptsReport from '../Reports/Receipts';
import SalesByModifier from '../Reports/SalesByModifier';
import DiscountReport from '../Reports/Discounts';
import Taxes from '../Reports/Taxes';
import Inventory from '../Inventory/Inventory';
import EmployeeList from '../Employees/EmployeeList';
import AccessRights from '../Employees/AccessRights';
import CustomerList from '../Customers/CustomerList';
import Apps from '../Integrations/Apps';
import Tokens from '../Integrations/Tokens';
import Settings from '../Settings/Settings';
import SalesOverview from '../po/Sales/SalesOverview';
import ManagerList from '../manager/ManagerList/ManagerList';
import ManagerPerformance from '../manager/Performance/ManagerPerformance';
import ManagerReports from '../manager/Reports/ManagerReports';
import ManagerPerformanceOverview from '../manager/Performance/ManagerPerformanceOverview';
import Items from '../po/Items/Items';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  // Dummy data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales 2024',
      data: [30000, 45000, 38000, 50000, 47000, 55000],
      borderColor: '#1e3c72',
      backgroundColor: 'rgba(30, 60, 114, 0.1)',
      tension: 0.4,
    }]
  };

  const categoryData = {
    labels: ['Food', 'Beverages', 'Snacks', 'Desserts', 'Others'],
    datasets: [{
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        '#1e3c72',
        '#2a5298',
        '#3867c0',
        '#4b7ee8',
        '#6495ed',
      ],
    }]
  };

  const paymentData = {
    labels: ['Cash', 'Credit Card', 'Mobile Payment', 'Other'],
    datasets: [{
      data: [40, 35, 20, 5],
      backgroundColor: [
        '#1e3c72',
        '#2a5298',
        '#3867c0',
        '#4b7ee8',
      ],
    }]
  };

  const formatZMW = (value) => {
    return `K${value.toLocaleString('en-ZM')}`;
  };

  return (
    <div className="dashboard-home">
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-details">
            <h3>Total Sales</h3>
            <p className="stat-value">{formatZMW(265000)}</p>
            <p className="stat-change positive">+12.5% <span>vs last month</span></p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-details">
            <h3>Total Orders</h3>
            <p className="stat-value">1,856</p>
            <p className="stat-change positive">+8.2% <span>vs last month</span></p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-details">
            <h3>Total Customers</h3>
            <p className="stat-value">946</p>
            <p className="stat-change positive">+5.3% <span>vs last month</span></p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-details">
            <h3>Average Sale</h3>
            <p className="stat-value">{formatZMW(142.78)}</p>
            <p className="stat-change positive">+3.8% <span>vs last month</span></p>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="charts-row">
          <div className="chart-card sales-trend">
            <h3>Sales Trend</h3>
            <Line 
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: value => formatZMW(value)
                    }
                  }
                }
              }}
            />
          </div>

          <div className="chart-card">
            <h3>Sales by Category</h3>
            <Doughnut 
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  }
                }
              }}
            />
          </div>

          <div className="chart-card">
            <h3>Payment Methods</h3>
            <Doughnut 
              data={paymentData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = {
    pointOfSale: {
      title: 'Point of Sale',
      icon: 'cash-register',
      subItems: [
        { name: 'POS Terminals', path: 'pos/terminals' },
        { name: 'Sales', path: 'pos/sales' },
        { name: 'Receipts', path: 'pos/receipts' }
      ]
    },
    manager: {
      title: 'Manager',
      icon: 'user-tie',
      subItems: [
        { name: 'Managers', path: 'manager/list' },
        { name: 'Performance Overview', path: 'manager/performance' },
        { name: 'Reports', path: 'manager/reports' },
      ]
    },
    reports: {
      title: 'Reports',
      icon: 'chart-bar',
      subItems: [
        { name: 'Sales Summary', path: 'reports/sales-summary' },
        { name: 'Sales by Item', path: 'reports/sales-by-item' },
        { name: 'Sales Category', path: 'reports/sales-category' },
        { name: 'Sales by Employee', path: 'reports/sales-by-employee' },
        { name: 'Sales by Payment Type', path: 'reports/sales-by-payment' },
        { name: 'Receipts', path: 'reports/receipts' },
        { name: 'Sales by Modifier', path: 'reports/sales-by-modifier' },
        { name: 'Discounts', path: 'reports/discounts' },
        { name: 'Taxes', path: 'reports/taxes' },
      ]
    },
    items: {
      title: 'Items',
      icon: 'box',
      subItems: [
        { name: 'Item List', path: 'items/list' },
        { name: 'Categories', path: 'items/categories' },
        { name: 'Modifiers', path: 'items/modifiers' },
        { name: 'Discounts', path: 'items/discounts' },
      ]
    },
    inventory: {
      title: 'Inventory',
      icon: 'warehouse',
      path: 'inventory'
    },
    employees: {
      title: 'Employees',
      icon: 'users',
      subItems: [
        { name: 'Employee List', path: 'employees/list' },
        { name: 'Access Rights', path: 'employees/access-rights' },
      ]
    },
    customers: {
      title: 'Customers',
      icon: 'user-group',
      path: 'customers'
    },
    integrations: {
      title: 'Integrations',
      icon: 'puzzle-piece',
      subItems: [
        { name: 'Apps', path: 'integrations/apps' },
        { name: 'Access Tokens', path: 'integrations/tokens' },
      ]
    },
    settings: {
      title: 'Settings',
      icon: 'cog',
      subItems: [
        { name: 'Features', path: 'settings/features' },
        { name: 'Billing & Subscriptions', path: 'settings/billing' },
        { name: 'Payment Types', path: 'settings/payment-types' },
        { name: 'Loyalty', path: 'settings/loyalty' },
        { name: 'Taxes', path: 'settings/taxes' },
        { name: 'Receipt', path: 'settings/receipt' },
        { name: 'Stores', path: 'settings/stores' },
        { name: 'POS Devices', path: 'settings/pos-devices' },
      ]
    },
    help: {
      title: 'Help',
      icon: 'question-circle',
      subItems: [
        { name: 'Help Center', path: 'help/center' },
        { name: 'Community', path: 'help/community' },
        { name: 'Live Chat', path: 'help/chat' },
      ]
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <button 
          className="hamburger-button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
        <span 
          className="brand-name"
          onClick={() => navigate('/dashboard')}
        >
          PeakPoint
        </span>
        <div className="header-right">
          <span className="user-name">John Doe</span>
          <button 
            className="logout-button"
            onClick={() => {
              setIsAuthenticated(false);
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <Sidebar 
          isOpen={isSidebarOpen} 
          menuItems={menuItems}
        />
        <main className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="pos/terminals" element={<POSList />} />
            <Route path="pos/sales" element={<SalesOverview />} />
            <Route path="pos/sales/:posId" element={<Sales />} />
            <Route path="pos/receipts" element={<POSReceipts />} />
            <Route path="reports/sales-summary" element={<SalesSummary />} />
            <Route path="reports/sales-by-item" element={<SalesByItem />} />
            <Route path="reports/sales-category" element={<SalesCategory />} />
            <Route path="reports/sales-by-employee" element={<SalesByEmployee />} />
            <Route path="reports/sales-by-payment" element={<SalesByPayment />} />
            <Route path="reports/receipts" element={<ReceiptsReport />} />
            <Route path="reports/sales-by-modifier" element={<SalesByModifier />} />
            <Route path="reports/discounts" element={<DiscountReport />} />
            <Route path="reports/taxes" element={<Taxes />} />
            <Route path="items/list" element={<ItemList />} />
            <Route path="items/categories" element={<Categories />} />
            <Route path="items/modifiers" element={<Modifiers />} />
            <Route path="items/discounts" element={<ItemDiscounts />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="employees/list" element={<EmployeeList />} />
            <Route path="employees/access-rights" element={<AccessRights />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="integrations/apps" element={<Apps />} />
            <Route path="integrations/tokens" element={<Tokens />} />
            <Route path="settings/*" element={<Settings />} />
            <Route path="manager/list" element={<ManagerList />} />
            <Route path="manager/performance" element={<ManagerPerformanceOverview />} />
            <Route path="manager/performance/:managerId" element={<ManagerPerformance />} />
            <Route path="manager/reports" element={<ManagerReports />} />
            <Route path="pos/items/:posId" element={<Items />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

// Update the site title
document.title = 'PeakPoint - Dashboard'; 