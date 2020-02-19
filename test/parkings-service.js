'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3001';

class ParkingService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getParkings() {
        const response = await axios.get(this.baseUrl + '/api/parkings');
        return response.data;
    }

    async getParking(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/parking/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getCarHistory(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/carHistory/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createParking(newParking) {
        const response = await axios.post(this.baseUrl + '/api/carEntry', newParking);
        return response.data;
    }

    async deleteAllParkings() {
        const response = await axios.delete(this.baseUrl + '/api/deleteParkings');
        return response.data;
    }

    async deleteOneParking(id) {
        const response = await axios.delete(this.baseUrl + '/api/deleteParking/' + id);
        return response.data;
    }

    async getUsers() {
        const response = await axios.get(this.baseUrl + '/api/users');
        return response.data;
    }

    async getUser(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/user/' + id);
            return response.data;
           // return response.data;
        } catch (e) {
            return null;
        }
    }

    async createUser(newUser) {
        const response = await axios.post(this.baseUrl + '/api/createuser', newUser);
        return response.data;
    }

    async authenticate(user) {
        try {
            const response = await axios.post(this.baseUrl + '/api/users/authenticate', user);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async clearAuth(user) {
        axios.defaults.headers.common['Authorization'] = '';
    }

    async deleteAllUsers() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/deleteusers');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneUser(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/deleteuser/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }
}

module.exports = ParkingService;