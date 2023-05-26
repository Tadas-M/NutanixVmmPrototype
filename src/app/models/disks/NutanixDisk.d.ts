import { INutanixMetadata, INutanixReference } from '../NutanixMetadata';

export interface INutanixDisk {
    metadata: INutanixMetadata;
    spec: INutanixDiskSpec;
    status: INutanixDiskStatus;
}

export interface INutanixDiskSpec {
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

export interface INutanixDiskStatus {
    state: string;
    execution_context: {
        task_uuid: string[];
    };
}
