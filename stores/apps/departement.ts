import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axios';
const router = useRouter();
export const usedepartementStore = defineStore({
    id: 'departement',
    state: () => ({
        departements: [],
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchdepartements() {
            /* try {
                const response = await axios.get('/api/departements');
                this.departements = response.data.departements;
            } catch (error) {
                alert(error);
                console.log(error);
            } */
        }
    }
});
