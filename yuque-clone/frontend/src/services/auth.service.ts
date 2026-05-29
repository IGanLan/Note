import apiClient from './api';
import { endpoints } from '../config';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export const authApi = {
  login: async (data: LoginDto) => {
    const response = await apiClient.post(endpoints.login, data);
    return response.data;
  },

  register: async (data: RegisterDto) => {
    const response = await apiClient.post(endpoints.register, data);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get(endpoints.me);
    return response.data;
  },
};
