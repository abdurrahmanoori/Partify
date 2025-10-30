import axios from 'axios';
import type { Customer, CustomerAdd, CustomerUpdate } from '../types/Customer';

const API_BASE_URL = 'http://localhost:5280/api'; // Adjust based on your backend URL

class CustomerService {
    private api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    async getCustomers(): Promise<Customer[]> {
        const response = await this.api.get<Customer[]>('/customer');
        return response.data;
    }

    async getCustomerById(id: number): Promise<Customer> {
        const response = await this.api.get<Customer>(`/customer/${id}`);
        return response.data;
    }

    async createCustomer(customer: CustomerAdd): Promise<Customer> {
        const response = await this.api.post<Customer>('/customer', customer);
        return response.data;
    }

    async updateCustomer(id: number, customer: CustomerUpdate): Promise<Customer> {
        const response = await this.api.put<Customer>(`/customer/${id}`, customer);
        return response.data;
    }

    async deleteCustomer(id: number): Promise<void> {
        await this.api.delete(`/customer/${id}`);
    }

    async getOutstanding(id: number): Promise<number> {
        const response = await this.api.get<number>(`/customer/${id}/outstanding`);
        return response.data;
    }
}

export default new CustomerService();