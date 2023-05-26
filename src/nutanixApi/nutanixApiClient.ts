import axios, { AxiosInstance } from 'axios';
import https from 'https';
import NutanixVmmClient from './NutanixVmmClient';
import NutanixClustersClient from './nutanixClustersClient';
import NutanixSubnetsClient from './nutanixSubnetsClient';
import NutanixVmRecoveryPointsClient from './nutanixVmRecoveryPointsClient';

class NutanixApiClient {
    static _axios: AxiosInstance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });

    static vms = new NutanixVmmClient(this._axios);
    static clusters = new NutanixClustersClient(this._axios);
    static subnets = new NutanixSubnetsClient(this._axios);
    static vmRecoveryPoints = new NutanixVmRecoveryPointsClient(this._axios);

    static initClient() {
        const username = localStorage.getItem('Username');
        const password = localStorage.getItem('Password');
        const nutanixApiUrl = localStorage.getItem('NutanixUrl');
        if (!username || !password || !nutanixApiUrl) return;
        this.setCredentials(username, password, nutanixApiUrl);
    }

    static setCredentials(
        username: string,
        password: string,
        nutanixUrl: string,
    ) {
        this._axios.defaults.baseURL = nutanixUrl;
        this._axios.defaults.auth = {
            username: username,
            password: password,
        };
    }
}

export default NutanixApiClient;
