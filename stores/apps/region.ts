import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axios';
const router = useRouter();
export const useregionStore = defineStore({
    id: 'region',
    state: () => ({
        regions: [],
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchregions() {
            try {
                const response = await axios.get('/api/regions');
                this.regions = response.data.regions;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
