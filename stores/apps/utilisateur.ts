import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axios';
const router = useRouter();
export const useUtilisateurStore = defineStore({
    id: 'Utilisateur',
    state: () => ({
        utilisateurs: [],
        user: null,
        permissions:[],
        access_token:'',
        refresh_token:'',
        token_type: "",
        expire_in: 14400,
        control_organ_slug: null,
        touristic_establishment_id: null,
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchUtilisateurs() {
            try {
                const response = await axios.get('/api/utilisateurs');
                this.utilisateurs = response.data.utilisateurs;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
         // Fetch followers from action
        async login(payload: any) {
            this.user = payload;
        }
    }
});
