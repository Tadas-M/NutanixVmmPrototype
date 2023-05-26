import { AxiosInstance } from 'axios';
import { INutanixUser } from 'app/models/users/NutanixUsersApi';

class NutanixUsersClient {
    constructor(private _axios: AxiosInstance) {}

    async currentlyLoggedInUser() {
        const result = await this._axios.get(`users/me`, {
            headers: {
                // Accept: 'application/json',
                // 'Content-Type': 'application/json',
            },
        });
        return result as INutanixUser;
    }
}

export default NutanixUsersClient;
