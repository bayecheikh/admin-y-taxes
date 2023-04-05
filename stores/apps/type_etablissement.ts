import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axios';
const router = useRouter();
export const usetype_etablissementStore = defineStore({
    id: 'type_etablissement',
    state: () => ({
        type_etablissements: [],
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchtype_etablissements() {
            try {
                const response = await axios.get('/api/type_etablissements');
                this.type_etablissements = response.data.type_etablissements;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
