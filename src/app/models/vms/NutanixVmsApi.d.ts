import { AxiosResponse } from 'axios';
import { INutanixVm } from './NutanixVm';

export interface INutanixApiListVms extends AxiosResponse {
    data: {
        api_version: string;
        entities: INutanixVm[];
        metadata: any;
    };
}

export interface INutanixApiVm extends AxiosResponse {
    data: INutanixVm;
}
