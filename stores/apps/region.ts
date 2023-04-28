import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axiosServices';
const router = useRouter();
const listGraphql = `{
    regions(sort:[ID_ASC]){
      edges{
        node{
          id
          name
          code
          countryId
          country{
            id
            name
            isoCode
          }        
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
        /* async fetchregions() {
            try {
                const response = await axios.get('/api/regions');
                this.regions = response.data.regions;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        } */
        async fetchregions() {
            try {
                const response = await axiosServices.post('/map/graphql/',{query:listGraphql});
                this.regions = response.data?.data?.regions?.edges
                console.log("Liste des regions ++++++++++++", response)
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async addregions(payload:any) {
          try {
              const response = await axiosServices.post('/map/graphql/',
              {
                  query:`mutation{
                      registerRegion(countryId:"${payload.countryId}",name:"${payload.name}",code:"${payload.code}"){
                          code
                          message
                          success
                          region{
                            id
                            name
                          }
                      }
                      
                  }`
              });
              console.log("Resultat ajout ++++++++++++", response)
              this.fetchregions()
              
          } catch (error) {
              alert(error);
              console.log(error);
          }
      },
      async updateregions(payload:any) {
          try {
              const response = await axiosServices.post('/map/graphql/',
              {
                  query:`mutation{
                      updateRegion(id:"${parseInt(payload.id)}",countryId:"${payload.countryId}",name:"${payload.name}",code:"${payload.code}"){
                          code
                          message
                          success
                          region{
                              id
                              name
                              code
                          }
                      }
                      
                  }`
              });
              console.log("Resultat update ++++++++++++", response)
              this.fetchregions()
              
          } catch (error) {
              alert(error);
              console.log(error);
          }
      },
      async deleteregions(payload:any) {
          try {
              const response = await axiosServices.post('/map/graphql/',
              {
                  query:`mutation{
                      deleteRegion(id:"${parseInt(payload.id)}"){
                          code
                          message
                          success
                      }
                      
                  }`
              });
              console.log("Resultat supression ++++++++++++", response)
              this.fetchregions()
              
          } catch (error) {
              alert(error);
              console.log(error);
          }
      }
    }
});
