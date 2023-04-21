import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axiosServices';
const router = useRouter();
const listGraphql = `{
    regions{
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
            /* try {
                const response = await axiosServices.post('/map/graphql/',{query:listGraphql});
                this.regions = response.data?.data?.controlOrgans?.edges
                console.log("Liste des region ++++++++++++", response)
            } catch (error) {
                alert(error);
                console.log(error);
            } */
        },
        async addregions(payload:any) {
          try {
              const response = await axiosServices.post('/map/graphql/',
              {
                  query:`mutation{
                      registerControlOrgan(address:"${payload.address}",countryId:"${payload.countryId}",departementId:"${payload.departementId}",regionId:"${payload.regionId}",name:"${payload.name}",phone:"${payload.phone}",picture:"${payload.picture}"){
                          code
                          message
                          success
                          controlOrgan{
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
                      updateControlOrgan(identifier:"${parseInt(payload.id)}",isActive:"${payload.isActive}",ownerId:"${payload.ownerId}",address:"${payload.address}",countryId:"${payload.countryId}",departementId:"${payload.departementId}",regionId:"${payload.regionId}",name:"${payload.name}",phone:"${payload.phone}",picture:"${payload.picture}"){
                          code
                          message
                          success
                          country{
                              id
                              name
                              isoCode
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
                      deleteControlOrgan(identifier:"${parseInt(payload.id)}"){
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
