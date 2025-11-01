import React, { useState } from 'react';
import CustomerList from '../components/CustomerList';
import CustomerForm from '../components/CustomerForm';
import CustomerDetail from '../components/CustomerDetail';
import type { Customer } from '../types/Customer';

type ViewMode = 'list' | 'add' | 'edit' | 'detail';

const CustomerManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setViewMode('add');
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setViewMode('edit');
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setViewMode('detail');
  };

  const handleRowClick = (customer: Customer) => {
    handleViewCustomer(customer);
  };

  const handleActionClick = (action: string, customer: Customer) => {
    switch (action) {
      case 'view':
        handleViewCustomer(customer);
        break;
      case 'edit':
        handleEditCustomer(customer);
        break;
      case 'delete':
        // Delete is handled in CustomerList component
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    setViewMode('list');
    setSelectedCustomer(null);
  };

  const handleCancel = () => {
    setViewMode('list');
    setSelectedCustomer(null);
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'add':
        return (
          <CustomerForm
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      case 'edit':
        return (
          <CustomerForm
            customer={selectedCustomer || undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      case 'detail':
        return (
          <CustomerDetail
            customerId={selectedCustomer?.id || 0}
            onBack={handleCancel}
            onEdit={handleEditCustomer}
          />
        );
      default:
        return (
          <CustomerList
            onAddCustomer={handleAddCustomer}
            onEditCustomer={handleEditCustomer}
            onViewCustomer={handleViewCustomer}
          />
        );
    }
  };

  return (
    <div className="customer-management">
      {renderContent()}
    </div>
  );
};

export default CustomerManagement;