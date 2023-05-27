import * as React from 'react';
import NutanixApiClient from 'nutanixApi/nutanixApiClient';
import { INutanixVm } from 'app/models/vms/NutanixVm';
import Button from 'react-bootstrap/Button';
import { CreateVmModal } from 'app/pages/VmList/Components/CreateVmModal';
import Table from 'react-bootstrap/Table';
import { VmListItem } from './Components/VmListItem';
import { INutanixVmRecoveryPoint } from 'app/models/vmRecoveryPoints/NutnaixVmRecoveryPoint';

interface IVmListProps {}

interface IVmListState {
    vms: INutanixVm[];
    vmRecoveryPoints: INutanixVmRecoveryPoint[];
}

export class VmList extends React.Component<IVmListProps, IVmListState> {
    constructor(props) {
        super(props);
        this.state = {
            vms: [],
            vmRecoveryPoints: [],
        };
    }

    refreshVmList() {
        NutanixApiClient.vms.listVms().then(data => {
            this.setState({ vms: data.data.entities });
        });
        NutanixApiClient.vmRecoveryPoints.listVmRecoveryPoints().then(data => {
            this.setState({
                vmRecoveryPoints: data.data.entities,
            });
        });
    }

    componentDidMount(): void {
        this.refreshVmList();
    }

    render(): React.ReactNode {
        return (
            <div className="w-100">
                <h1>
                    Virtual machines{' '}
                    <Button onClick={() => this.refreshVmList()}>
                        Refresh
                    </Button>
                    <CreateVmModal />
                </h1>
                <Table striped className="align-middle">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Power</th>
                            <th>CPU</th>
                            <th>Cores</th>
                            <th>Memory</th>
                            <th>IP Addresses</th>
                            <th>Cluster</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.vms.map(vm => (
                            <VmListItem
                                key={vm.metadata.uuid + '_id'}
                                vm={vm}
                                vmRecoveryPoints={this.state.vmRecoveryPoints.filter(
                                    x =>
                                        x.spec.resources.parent_vm_reference
                                            .uuid === vm.metadata.uuid,
                                )}
                                refreshVmList={() => this.refreshVmList()}
                            />
                        ))}
                    </tbody>
                </Table>
                {/* <Row xs={1} md={3} className="g-4">
                    {this.state.vmList.map(x => (
                        <Col key={x.metadata.uuid}>
                            <VmInstance key={x.metadata.uuid} vm={x} />
                        </Col>
                    ))}
                </Row> */}
            </div>
        );
    }
}
