import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axiosServices';
const router = useRouter();
const listGraphql = `{
    controlOrgans{
      edges{
        node{
          id
          name
          slug
          isActive
          picture
          address
          countryId
          regionId
          departmentId
          phone
          ownerId
          createdBy
          country{
            id
            name
            isoCode
          }
          
        }
      }
    }
  }`;
export const useetablissement_touristiqueStore = defineStore({
    id: 'etablissement_touristique',
    state: () => ({
        etablissement_touristiques: [],
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        /* async fetchetablissement_touristiques() {
            try {
                const response = await axios.get('/api/etablissement_touristiques');
                this.etablissement_touristiques = response.data.etablissement_touristiques;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        } */
        async fetchetablissement_touristiques() {
            try {
                const response = await axiosServices.post('/core/graphql/',{query:listGraphql});
                this.etablissement_touristiques = response.data?.data?.controlOrgans?.edges
                console.log("Liste des etablissement_touristique ++++++++++++", response.data.data.controlOrgans?.edges)
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
