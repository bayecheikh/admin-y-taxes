import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axios';
const router = useRouter();
export const usepaysStore = defineStore({
    id: 'Pays',
    state: () => ({
        payss: [],
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchpayss() {
            try {
                const response = await axios.get('/api/payss');
                this.payss = response.data.payss;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
