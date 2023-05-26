import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NutanixApiClient from 'nutanixApi/nutanixApiClient';
import { INutanixVm } from 'app/models/vms/NutanixVm';
import { INutanixCluster } from 'app/models/clusters/NutanixCluster';
import { INutanixSubnet } from 'app/models/subnets/NutanixSubnet';

const DEFAULT_MEMORY = 1024;

interface ICreateEditVmFormProps {
    onSubmit(vm: INutanixVm): void;
    onCancel(): void;
}

interface ICreateEditVmFormState {
    showModal: boolean;

    name: string;
    cpu: number;
    cores: number;
    memory: number;
    cluster?: string;
    subnet?: string;

    clusters: INutanixCluster[];
    subnets: INutanixSubnet[];
}

export class CreateEditVmForm extends React.Component<
    ICreateEditVmFormProps,
    ICreateEditVmFormState
> {
    constructor(props: ICreateEditVmFormProps) {
        super(props);
        this.state = {
            showModal: false,

            name: '',
            cpu: 1,
            cores: 1,
            memory: DEFAULT_MEMORY,

            clusters: [],
            subnets: [],
        };
    }

    componentDidMount(): void {
        NutanixApiClient.clusters.listClusters().then(clustersData => {
            this.setState({ clusters: clustersData.data.entities });
        });
        NutanixApiClient.subnets.listSubnets().then(subnetsData => {
            this.setState({ subnets: subnetsData.data.entities });
        });
    }

    createVm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!this.isValid()) return;

        const vm = {
            metadata: {
                kind: 'vm',
            },
            spec: {
                name: this.state.name,
                resources: {
                    num_vcpus_per_socket: this.state.cpu,
                    num_threads_per_core: this.state.cores,
                    memory_size_mib: this.state.memory,
                    nic_list: [
                        {
                            subnet_reference: {
                                uuid: this.state.subnet,
                                kind: 'subnet',
                            },
                        },
                    ],
                },
                cluster_reference: {
                    uuid: this.state.cluster,
                    kind: 'cluster',
                },
            },
        } as INutanixVm;
        this.props.onSubmit(vm);
    }

    isValid() {
        if (this.state.name.length === 0) return false;
        if (this.state.cpu <= 0) return false;
        if (this.state.cores <= 0) return false;
        if (this.state.memory < 64) return false;
        if (!this.state.cluster || this.state.cluster.length === 0)
            return false;
        if (!this.state.subnet || this.state.subnet.length === 0) return false;

        return true;
    }

    render(): React.ReactNode {
        return (
            <>
                <Form onSubmit={event => this.createVm(event)}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            onChange={event =>
                                this.setState({
                                    name: event.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cluster">
                        <Form.Label>Cluster</Form.Label>
                        <Form.Select
                            onChange={event =>
                                this.setState({
                                    cluster: event.target.value,
                                })
                            }
                            aria-label="Default select example"
                        >
                            <option>Cluster</option>
                            {this.state.clusters.map(item => {
                                return (
                                    <option
                                        key={item.metadata.uuid}
                                        value={item.metadata.uuid}
                                    >
                                        {item.spec.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="subnet">
                        <Form.Label>Subnet</Form.Label>
                        <Form.Select
                            onChange={event =>
                                this.setState({
                                    subnet: event.target.value,
                                })
                            }
                            aria-label="Default select example"
                        >
                            <option>Subnet</option>
                            {this.state.subnets.map(item => {
                                return (
                                    <option
                                        key={item.metadata.uuid}
                                        value={item.metadata.uuid}
                                    >
                                        {item.spec.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cpu">
                        <Form.Label>CPU</Form.Label>
                        <Form.Control
                            type="number"
                            defaultValue={1}
                            onChange={event =>
                                this.setState({
                                    cpu: event.target
                                        .value as unknown as number,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cores">
                        <Form.Label>Cores per CPU</Form.Label>
                        <Form.Control
                            type="number"
                            defaultValue={1}
                            onChange={event =>
                                this.setState({
                                    cores: event.target
                                        .value as unknown as number,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="memory">
                        <Form.Label>Memory</Form.Label>
                        <Form.Control
                            type="number"
                            defaultValue={DEFAULT_MEMORY}
                            onChange={event =>
                                this.setState({
                                    memory: event.target
                                        .value as unknown as number,
                                })
                            }
                        />
                    </Form.Group>
                    <Button variant="secondary" onClick={this.props.onCancel}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        className="float-end"
                    >
                        Create
                    </Button>
                </Form>
            </>
        );
    }
}
