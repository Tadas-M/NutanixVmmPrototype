import {
    INutanixApiListVms,
    INutanixApiVm,
} from 'app/models/vms/NutanixVmsApi';
import { INutanixVm } from 'app/models/vms/NutanixVm';
import { AxiosInstance } from 'axios';

class NutanixVmmClient {
    constructor(private _axios: AxiosInstance) {}

    async listVms() {
        const result = await this._axios
            .post('vms/list', {
                kind: 'vm',
                sort_attribute: '',
                filter: '',
                length: undefined,
                sort_order: 'ASCENDING',
                offset: 0,
            })
            .catch(e => console.log(e));
        if (result === undefined) return;
        return result as INutanixApiListVms;
    }

    async createVm(vm: INutanixVm) {
        const result = await this._axios.post('vms', vm);
        return result as INutanixApiVm;
    }

    cloneVm(uuid: string) {
        return this._axios.post(`vms/${uuid}/clone`, {} as object);
    }

    deleteVm(uuid: string) {
        return this._axios.delete(`vms/${uuid}`);
    }

    powerOffVm(vm: INutanixVm) {
        vm.spec.resources.power_state = 'OFF';
        return this._axios.put(`vms/${vm.metadata.uuid}`, {
            metadata: vm.metadata,
            spec: vm.spec,
        });
    }

    powerOnVm(vm: INutanixVm) {
        vm.spec.resources.power_state = 'ON';
        return this._axios.put(`vms/${vm.metadata.uuid}`, {
            metadata: vm.metadata,
            spec: vm.spec,
        });
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
            disk_file_format: '.ovf',
        });
    }
}

export default NutanixVmmClient;
