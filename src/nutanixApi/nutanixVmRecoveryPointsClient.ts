import { AxiosInstance } from 'axios';
import { INutanixApiVmRecoveryPointsList } from 'app/models/vmRecoveryPoints/NutanixVmRecoveryPointsApi';

class NutanixVmRecoveryPointsClient {
    constructor(private _axios: AxiosInstance) {}

    async listVmRecoveryPoints() {
        const result = await this._axios.post('vm_recovery_points/list', {
            kind: 'vm_recovery_point',
            sort_attribute: '',
            filter: '',
            length: undefined,
            sort_order: 'ASCENDING',
            offset: 0,
        });
        return result as INutanixApiVmRecoveryPointsList;
    }
}

export default NutanixVmRecoveryPointsClient;
