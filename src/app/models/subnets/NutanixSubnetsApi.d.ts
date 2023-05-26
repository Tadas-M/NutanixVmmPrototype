import { AxiosResponse } from 'axios';
import { INutanixSubnet } from './NutanixSubnet';

export interface INutanixSubnetsApiList extends AxiosResponse {
    data: {
        api_version: string;
        entities: INutanixSubnet[];
        metadata: any;
    };
}
