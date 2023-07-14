import { INutanixVm } from 'app/models/vms/NutanixVm';
import NutanixApiClient from 'nutanixApi/nutanixApiClient';
import * as React from 'react';
import { ReactNode } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

interface IVmActionsDropdownProps {
    vm: INutanixVm;
    refreshVmList: () => void;
}

export class VmActionsDropdown extends React.Component<IVmActionsDropdownProps> {
    vmIsOff = (vm: INutanixVm) => vm.spec.resources.power_state === 'OFF';

    render(): ReactNode {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Actions
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() =>
                            NutanixApiClient.vms
                                .powerOnVm(this.props.vm)
                                .then(() => this.props.refreshVmList())
                        }
                        disabled={!this.vmIsOff(this.props.vm)}
                    >
                        Power On
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() =>
                            NutanixApiClient.vms
                                .powerOffVm(this.props.vm)
                                .then(() => this.props.refreshVmList())
                        }
                        disabled={this.vmIsOff(this.props.vm)}
                    >
                        Power Off
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() =>
                            NutanixApiClient.vms
                                .cloneVm(this.props.vm.metadata.uuid)
                                .then(() => this.props.refreshVmList())
                        }
                        disabled={false}
                    >
                        Clone
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() =>
                            NutanixApiClient.vms
                                .deleteVm(this.props.vm.metadata.uuid)
                                .then(() => this.props.refreshVmList())
                        }
                    >
                        Delete
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() =>
                            NutanixApiClient.vms
                                .snapshotVm(this.props.vm.metadata.uuid)
                                .then(() => this.props.refreshVmList())
                        }
                    >
                        Snapshot
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() =>
                            NutanixApiClient.vms
                                .exportVm(this.props.vm.metadata.uuid, 'test')
                                .then(() => this.props.refreshVmList())
                        }
                    >
                        Export
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
