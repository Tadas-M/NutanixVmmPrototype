import { AxiosResponse } from 'axios';
import { INutanixMetadata } from '../NutanixMetadata';

export interface INutanixUser extends AxiosResponse {
    data: {
        apiVersion: string;
        metadata: INutanixMetadata;
        spec: any;
        status: any;
    };
}
