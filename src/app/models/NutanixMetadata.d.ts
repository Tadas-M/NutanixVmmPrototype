export interface INutanixMetadata {
    kind: string;
    uuid: string;
    project_reference: INutanixReference;
    name: string;
    spec_version: number;
    creation_time: string;
    last_update_time: string;
    owner_reference: INutanixReference;
}

export interface INutanixReference {
    kind: string;
    name: string;
    uuid: string;
}
