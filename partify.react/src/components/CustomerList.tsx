import React, { useEffect, useState } from 'react';
import type { Customer } from '../types/Customer';
import CustomerService from '../services/CustomerService';
import '../styles/CustomerStyles.css';

interface CustomerListProps {
  onAddCustomer?: () => void;
  onEditCustomer?: (customer: Customer) => void;
  onViewCustomer?: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({
  onAddCustomer,
  onEditCustomer,
  onViewCustomer
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await CustomerService.getCustomers();
      console.log('Fetched customers:', data);
      setCustomers(data || []);
    } catch (err) {
      setError('Failed to load customers');
      console.error('Error loading customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await CustomerService.deleteCustomer(id);
        setCustomers(customers.filter(c => c.id !== id));
      } catch (err) {
        setError('Failed to delete customer');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading customers...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="customer-list">
      <div className="customer-list-header">
        <h2>Customer Management</h2>
        <div className="header-actions">
          <button onClick={loadCustomers} className="btn btn-secondary">
            <span className="btn-icon">🔄</span>
            Refresh
          </button>
          <button onClick={onAddCustomer} className="btn btn-primary">
            <span className="btn-icon">+</span>
            Add Customer
          </button>
        </div>
      </div>
      


      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          {error}
        </div>
      )}

      <div className="table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Car Model</th>
              <th>Plate Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className="customer-row">
                <td className="customer-id">#{customer.id}</td>
                <td className="customer-name">
                  {customer.name} {customer.lastName}
                </td>
                <td className="customer-email">
                  {customer.email || <span className="text-muted">No email</span>}
                </td>
                <td className="customer-phone">
                  {customer.phoneNumber || <span className="text-muted">No phone</span>}
                </td>
                <td className="customer-car">
                  {customer.carModel || <span className="text-muted">No car</span>}
                </td>
                <td className="customer-plate">
                  {customer.plateNumber || <span className="text-muted">No plate</span>}
                </td>
                <td className="customer-actions">
                  <button
                    className="btn btn-outline view-btn"
                    title="View Details"
                    onClick={() => onViewCustomer?.(customer)}
                  >
                    👁️
                  </button>
                  <button
                    className="btn btn-outline edit-btn"
                    title="Edit Customer"
                    onClick={() => onEditCustomer?.(customer)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-outline delete-btn"
                    onClick={() => handleDelete(customer.id)}
                    title="Delete Customer"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-cards">
        {customers.map(customer => (
          <div key={customer.id} className="customer-card">
            <div className="card-header">
              <span className="card-id">#{customer.id}</span>
              <div className="card-actions">
                <button
                  className="btn btn-outline view-btn"
                  title="View Details"
                  onClick={() => onViewCustomer?.(customer)}
                >
                  👁️
                </button>
                <button
                  className="btn btn-outline edit-btn"
                  title="Edit Customer"
                  onClick={() => onEditCustomer?.(customer)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-outline delete-btn"
                  onClick={() => handleDelete(customer.id)}
                  title="Delete Customer"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="card-name">
              {customer.name} {customer.lastName}
            </div>
            <div className="card-info">
              <div className="card-info-item">
                <span className="card-info-label">Email</span>
                <span className="card-info-value">
                  {customer.email || <span className="text-muted">No email</span>}
                </span>
              </div>
              <div className="card-info-item">
                <span className="card-info-label">Phone</span>
                <span className="card-info-value">
                  {customer.phoneNumber || <span className="text-muted">No phone</span>}
                </span>
              </div>
              <div className="card-info-item">
                <span className="card-info-label">Car Model</span>
                <span className="card-info-value">
                  {customer.carModel || <span className="text-muted">No car</span>}
                </span>
              </div>
              <div className="card-info-item">
                <span className="card-info-label">Plate Number</span>
                <span className="card-info-value">
                  {customer.plateNumber || <span className="text-muted">No plate</span>}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {customers.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No customers found</h3>
          <p>Start by adding your first customer to the system.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerList;