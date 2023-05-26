import {
    INutanixApiListVms,
    INutanixApiVm,
} from 'app/models/vms/NutanixVmsApi';
import { INutanixVm } from 'app/models/vms/NutanixVm';
import { AxiosInstance } from 'axios';

class NutanixVmmClient {
    constructor(private _axios: AxiosInstance) {}

    async listVms() {
        const result = await this._axios.post('vms/list', {
            kind: 'vm',
            sort_attribute: '',
            filter: '',
            length: undefined,
            sort_order: 'ASCENDING',
            offset: 0,
        });
        return result as INutanixApiListVms;
    }

    powerOffVm(vm: INutanixVm) {
        vm.spec.resources.power_state = 'OFF';
        return this._axios.put(
            `vms/${vm.metadata.uuid}`,
            {
                metadata: vm.metadata,
                spec: vm.spec,
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    cloneVm(uuid: string) {
        return this._axios.post(`vms/${uuid}/clone`, {} as object, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    powerOnVm(vm: INutanixVm) {
        vm.spec.resources.power_state = 'ON';
        return this._axios.put(
            `vms/${vm.metadata.uuid}`,
            {
                metadata: vm.metadata,
                spec: vm.spec,
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    deleteVm(uuid: string) {
        return this._axios.delete(`vms/${uuid}`);
    }

    async createVm(vm: INutanixVm) {
        const result = await this._axios.post('vms', vm);
        return result as INutanixApiVm;
    }

    snapshotVm(uuid: string) {
        return this._axios.post(`vms/${uuid}/snapshot`, {});
    }

    revertVm(uuid: string, recoveryPointUuid: string) {
        return this._axios.post(`vms/${uuid}/revert`, {
            vm_recovery_point_uuid: recoveryPointUuid,
        });
    }

    exportVm(uuid: string, ovaName: string) {
        return this._axios.post(`vms/${uuid}/export`, {
            name: ovaName,
        });
    }
}

export default NutanixVmmClient;
