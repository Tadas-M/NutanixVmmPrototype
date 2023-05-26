import { INutanixVm } from 'app/models/vms/NutanixVm';
import NutanixApiClient from 'nutanixApi/nutanixApiClient';
import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';

interface IVmInstanceProps {
    vm: INutanixVm;
}

export class VmInstance extends React.Component<IVmInstanceProps> {
    vmIsOff = (vm: INutanixVm) => vm.spec.resources.power_state === 'OFF';

    render() {
        return (
            <Card border="dark" style={{ width: '18rem' }}>
                <Card.Header>{this.props.vm.spec.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Status {this.props.vm.status.state} <br />
                        Power {this.props.vm.spec.resources.power_state} <br />
                        Threads{' '}
                        {this.props.vm.spec.resources.num_threads_per_core}{' '}
                        <br />
                        Cores{' '}
                        {this.props.vm.spec.resources.num_vcpus_per_socket}
                    </Card.Text>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() =>
                                    NutanixApiClient.vms.powerOnVm(
                                        this.props.vm,
                                    )
                                }
                                disabled={!this.vmIsOff(this.props.vm)}
                            >
                                Power On
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() =>
                                    NutanixApiClient.vms.powerOffVm(
                                        this.props.vm,
                                    )
                                }
                                disabled={this.vmIsOff(this.props.vm)}
                            >
                                Power Off
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() =>
                                    NutanixApiClient.vms.cloneVm(
                                        this.props.vm.metadata.uuid,
                                    )
                                }
                                disabled={false}
                            >
                                Clone
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() =>
                                    NutanixApiClient.vms.deleteVm(
                                        this.props.vm.metadata.uuid,
                                    )
                                }
                            >
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
            </Card>
        );
    }
}
