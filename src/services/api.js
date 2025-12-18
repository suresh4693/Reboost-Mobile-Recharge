const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please ensure the backend is running on port 5000.');
      }
      throw error;
    }
  }

  // Auth methods
  async register(userData) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: userData,
    });
    this.setToken(data.token);
    return data;
  }

  async login(credentials) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });
    this.setToken(data.token);
    return data;
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Plans methods
  async getPlans(filters = {}) {
    const params = new URLSearchParams(Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== undefined)
    ));
    return this.request(`/plans?${params}`);
  }

  async seedPlans() {
    return this.request('/plans/seed', { method: 'POST' });
  }

  // Recharge methods
  async processRecharge(rechargeData) {
    return this.request('/recharge', {
      method: 'POST',
      body: rechargeData,
    });
  }

  async getRechargeHistory() {
    return this.request('/recharge/history');
  }

  // Bills methods
  async payBill(billData) {
    return this.request('/bills/pay', {
      method: 'POST',
      body: billData,
    });
  }

  async getBillHistory() {
    return this.request('/bills/history');
  }

  // Dashboard methods
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  logout() {
    this.removeToken();
  }
}

export default new ApiService();