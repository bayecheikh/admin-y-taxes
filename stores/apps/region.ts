import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axiosServices';
const router = useRouter();
const listGraphql = `{
    regions(sort:[NAME_ASC]){
        pageInfo{
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges{
          node{
            id
            name
            isoCode
          }
        }
    }
}`;
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
        /* async fetchregions() {
            try {
                const response = await axiosServices.post('/map/graphql/',{query:listGraphql});
                this.regions = response.data?.data?.countries?.edges
                console.log("Liste des region ++++++++++++", response.data.data.countries?.edges)
            } catch (error) {
                alert(error);
                console.log(error);
            }
        } */
    }
});
