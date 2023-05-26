import { AxiosInstance } from 'axios';
import { INutanixClustersApiList } from 'app/models/clusters/NutanixClustersApi';

class NutanixClustersClient {
    constructor(private _axios: AxiosInstance) {}

    async listClusters() {
        const result = await this._axios.post('clusters/list', {
            kind: 'cluster',
            sort_attribute: '',
            filter: '',
            length: undefined,
            sort_order: 'ASCENDING',
            offset: 0,
        });
        return result as INutanixClustersApiList;
    }
}

export default NutanixClustersClient;
