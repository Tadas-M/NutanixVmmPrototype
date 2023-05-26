import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NutanixApiClient from 'nutanixApi/nutanixApiClient';
import { INutanixVm } from 'app/models/vms/NutanixVm';
import { INutanixCluster } from 'app/models/clusters/NutanixCluster';
import { INutanixSubnet } from 'app/models/subnets/NutanixSubnet';
import { CreateEditVmForm } from './CreateEditVmForm';

const DEFAULT_MEMORY = 1024;

interface ICreateVmModalState {
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

export class CreateVmModal extends React.Component<{}, ICreateVmModalState> {
    constructor(props) {
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

    handleClose = () => this.setState({ showModal: false });

    handleShow = () =>
        this.setState({
            showModal: true,
            name: '',
            cluster: '',
        });

    createVm(vm: INutanixVm) {
        NutanixApiClient.vms.createVm(vm);
        this.handleClose();
    }

    render(): React.ReactNode {
        return (
            <>
                <Button variant={'success'} onClick={this.handleShow}>
                    Create VM
                </Button>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Virtual machine</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateEditVmForm
                            onSubmit={vm => this.createVm(vm)}
                            onCancel={() => this.handleClose()}
                        />
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
