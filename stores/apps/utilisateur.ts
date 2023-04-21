import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import yendzApi from '@/utils/axios';
import axiosServices from '@/utils/axiosServices';
const router = useRouter();
const graphqlQuery = `{
    me{
        username
        firstName
        lastName
        role {
            id
            name
            description
        }
    }
}`;
export const useUtilisateurStore = defineStore({
    id: 'Utilisateur',
    state: () => ({
        utilisateurs: [],
        user: null,
        me: null,
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
            /* try {
                const response = await axios.get('/api/utilisateurs');
                this.utilisateurs = response.data.utilisateurs;
            } catch (error) {
                alert(error);
                console.log(error);
            } */
        },
        // Fetch followers from action
        async fetchMe(id:any) {
            try {
                const response = await axiosServices.post('/users/graphql/',{query:graphqlQuery,
                    variables: {
                      id: id,
                      username: 'Test'
                    }
                  });
                console.log("Me +++++++ ",response.data?.data?.me)
                this.me = response.data?.data?.me
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
