import { AxiosInstance } from 'axios';
import { INutanixSubnetsApiList } from 'app/models/subnets/NutanixSubnetsApi';

class NutanixSubnetsClient {
    constructor(private _axios: AxiosInstance) {}

    async listSubnets() {
        const result = await this._axios.post('subnets/list', {
            kind: 'subnet',
            sort_attribute: '',
            filter: '',
            length: undefined,
            sort_order: 'ASCENDING',
            offset: 0,
        });
        return result as INutanixSubnetsApiList;
    }
}

export default NutanixSubnetsClient;
