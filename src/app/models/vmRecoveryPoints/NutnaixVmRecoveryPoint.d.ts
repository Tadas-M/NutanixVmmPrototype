import { INutanixMetadata, INutanixReference } from '../NutanixMetadata';

export interface INutanixVmRecoveryPoint {
    metadata: INutanixMetadata;
    spec: INutanixVmRecoveryPointSpec;
    status: INutanixVmRecoveryPointStatus;
}

export interface INutanixVmRecoveryPointSpec {
    name: string;
    resources: {
        source_cluster_reference: INutanixReference;
        parent_vm_reference: INutanixReference;
        recovery_point_type: string;
        creation_time: string;
        expiration_time: string;
    };
    cluster_reference: INutanixReference;
}

export interface INutanixVmRecoveryPointStatus {
    state: string;
}
