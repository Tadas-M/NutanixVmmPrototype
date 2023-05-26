import { INutanixMetadata, INutanixReference } from '../NutanixMetadata';

export interface INutanixSubnet {
    metadata: INutanixMetadata;
    spec: INutanixSubnetSpec;
    status: INutanixSubnetStatus;
}

export interface INutanixSubnetSpec {
    name: string;
    description: string;
    resources: {
        subnet_type: string;
        vlan_id: number;
        network_function_chain_reference: INutanixReference;
        virtual_network_reference: INutanixReference;
        vpc_reference: INutanixReference;
    };
    cluster_reference: INutanixReference;
}

export interface INutanixSubnetStatus {
    state: string;
    execution_context: {
        task_uuid: string[];
    };
}
