import { INutanixMetadata, INutanixReference } from '../NutanixMetadata';

export interface INutanixVm {
    metadata: INutanixMetadata;
    spec: INutanixVmSpec;
    status: INutanixVmStatus;
}

export interface INutanixVmSpec {
    name: string;
    resources: {
        power_state: string;
        num_threads_per_core: number;
        num_vcpus_per_socket: number;
        memory_size_mib: number;
        nic_list: INutanixVmNic[];
        disk_list: INutanixVmDisk[];
    };
    cluster_reference: INutanixReference;
    owner_reference: INutanixReference;
}

export interface INutanixVmStatus {
    state: string;
    execution_context: {
        task_uuid: string[];
    };
}

export interface INutanixVmNic {
    uuid: string;
    nic_type: string;
    subnet_reference: INutanixReference;
    ip_endpoint_list: INutanixVmIpEndpoint[];
}

export interface INutanixVmIpEndpoint {
    ip: string;
    type: string;
}

export interface INutanixVmDisk {
    device_properties: {
        device_type: string;
        disk_address: {
            adapter_type: string;
            device_index: number;
        };
    };
    storage_config: {
        storage_container_reference: INutanixReference;
    };
    uuid: string;
    disk_size_mib?: number;
}
