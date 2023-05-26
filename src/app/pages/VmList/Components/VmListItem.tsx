import { INutanixVm } from 'app/models/vms/NutanixVm';
import * as React from 'react';
import { VmActionsDropdown } from './VmActionsDropdown';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import { INutanixVmRecoveryPoint } from 'app/models/vmRecoveryPoints/NutnaixVmRecoveryPoint';
import Table from 'react-bootstrap/Table';
import NutanixApiClient from 'nutanixApi/nutanixApiClient';

interface IVmListItemProps {
    vm: INutanixVm;
    vmRecoveryPoints: INutanixVmRecoveryPoint[];
    refreshVmList: () => void;
}

interface IVmListItemState {
    open: boolean;
}

export class VmListItem extends React.Component<
    IVmListItemProps,
    IVmListItemState
> {
    constructor(props: IVmListItemProps) {
        super(props);
        this.state = {
            open: false,
        };
    }

    render() {
        return [
            <tr
                key={this.props.vm.metadata.uuid}
                aria-controls={this.props.vm.metadata.uuid + '_collapse'}
                aria-expanded={this.state.open}
            >
                <td>
                    <Button
                        variant="link"
                        onClick={() =>
                            this.setState({ open: !this.state.open })
                        }
                    >
                        {this.props.vm.spec.name}
                    </Button>{' '}
                </td>
                <td>{this.props.vm.status.state}</td>
                <td>{this.props.vm.spec.resources.power_state}</td>
                <td>{this.props.vm.spec.resources.num_vcpus_per_socket}</td>
                <td>{this.props.vm.spec.resources.num_threads_per_core}</td>
                <td>{this.props.vm.spec.resources.memory_size_mib}Mb</td>
                <td>
                    {this.props.vm.spec.resources.nic_list
                        .map(nic =>
                            nic.ip_endpoint_list.map(ip => ip.ip).join(', '),
                        )
                        .join(', ')}
                </td>
                <td>{this.props.vm.spec.cluster_reference.name}</td>
                <td>
                    <VmActionsDropdown
                        vm={this.props.vm}
                        refreshVmList={() => this.props.refreshVmList()}
                    />
                </td>
            </tr>,
            <Collapse
                in={this.state.open}
                key={this.props.vm.metadata.uuid + '_2'}
            >
                <tr
                    id={this.props.vm.metadata.uuid + '_collapse1'}
                    className={`${
                        this.props.vmRecoveryPoints.length <= 0 ? 'd-none' : ''
                    }`}
                >
                    <td colSpan={9}>
                        <h6>Recovery points</h6>
                        <Table className={`align-middle`}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Creation time</th>
                                    <th>Expiration time</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.vmRecoveryPoints
                                    .sort(
                                        (a, b) =>
                                            new Date(b.spec.name).getTime() -
                                            new Date(a.spec.name).getTime(),
                                    )
                                    .map((point, index) => {
                                        return (
                                            <tr key={point.metadata.uuid}>
                                                <td>{index + 1}</td>
                                                <td>{point.spec.name}</td>
                                                <td>
                                                    {
                                                        point.spec.resources
                                                            .expiration_time
                                                    }
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="link"
                                                        onClick={() =>
                                                            NutanixApiClient.vms.revertVm(
                                                                this.props.vm
                                                                    .metadata
                                                                    .uuid,
                                                                point.metadata
                                                                    .uuid,
                                                            )
                                                        }
                                                    >
                                                        Revert
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </Table>
                    </td>
                </tr>
            </Collapse>,
            <Collapse
                in={this.state.open}
                key={this.props.vm.metadata.uuid + '_3'}
            >
                <tr
                    id={this.props.vm.metadata.uuid + '_collapse2'}
                    className={`${
                        this.props.vm.spec.resources.disk_list.length <= 0
                            ? 'd-none'
                            : ''
                    }`}
                >
                    <td colSpan={9}>
                        <h6>Disks</h6>
                        <Table className={`align-middle`}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Disk address</th>
                                    <th>Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.vm.spec.resources.disk_list
                                    .sort(
                                        (a, b) =>
                                            b.device_properties.disk_address
                                                .device_index -
                                            a.device_properties.disk_address
                                                .device_index,
                                    )
                                    .map((disk, index) => {
                                        return (
                                            <tr key={disk.uuid}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {disk.device_properties
                                                        .disk_address
                                                        .adapter_type +
                                                        '.' +
                                                        disk.device_properties
                                                            .disk_address
                                                            .device_index}
                                                </td>
                                                <td>
                                                    {disk.disk_size_mib
                                                        ? `${Math.round(
                                                              disk.disk_size_mib *
                                                                  1.049,
                                                          )}Mb`
                                                        : ''}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </Table>
                    </td>
                </tr>
            </Collapse>,
        ];
    }
}
