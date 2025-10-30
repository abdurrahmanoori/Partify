export interface Customer {
    id: number;
    name?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    carModel?: string;
    plateNumber?: string;
}

export interface CustomerAdd {
    name: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    carModel?: string;
    plateNumber?: string;
}

export interface CustomerUpdate {
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    carModel?: string;
    plateNumber?: string;
}