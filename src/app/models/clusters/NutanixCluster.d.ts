import { INutanixMetadata } from '../NutanixMetadata';

export interface INutanixCluster {
    metadata: INutanixMetadata;
    spec: INutanixClusterSpec;
    status: INutanixClusterStatus;
}

export interface INutanixClusterSpec {
    name: string;
    resources: {
        config: any;
        network: any;
        runtime_status_list: string[];
    };
}

export interface INutanixClusterStatus {
    state: string;
    execution_context: {
        task_uuid: string[];
    };
}
