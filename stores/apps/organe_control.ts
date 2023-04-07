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
          region{
            id
            name
            code
          }
          department{
            id
            name
            code
          }
          
        }
      }
    }
}`;
export const useorgane_controlStore = defineStore({
    id: 'organe_control',
    state: () => ({
        organe_controls: [],
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        /* async fetchorgane_controls() {
            try {
                const response = await axios.get('/api/organe_controls');
                this.organe_controls = response.data.organe_controls;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        } */
        async fetchorgane_controls() {
            try {
                const response = await axiosServices.post('/core/graphql/',{query:listGraphql});
                this.organe_controls = response.data?.data?.controlOrgans?.edges
                console.log("Liste des organe_control ++++++++++++", response)
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
