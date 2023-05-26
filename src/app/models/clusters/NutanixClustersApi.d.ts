import { AxiosResponse } from 'axios';
import { INutanixCluster } from './NutanixCluster';

export interface INutanixClustersApiList extends AxiosResponse {
    data: {
        api_version: string;
        entities: INutanixCluster[];
        metadata: any;
    };
}
