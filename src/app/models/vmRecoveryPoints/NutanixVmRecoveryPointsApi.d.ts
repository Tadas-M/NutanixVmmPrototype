import { AxiosResponse } from 'axios';
import { INutanixVmRecoveryPoint } from './NutnaixVmRecoveryPoint';

export interface INutanixApiVmRecoveryPointsList extends AxiosResponse {
    data: {
        api_version: string;
        entities: INutanixVmRecoveryPoint[];
        metadata: any;
    };
}
