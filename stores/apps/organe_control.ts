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
        },
        async addorgane_controls(payload:any) {
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
              this.fetchorgane_controls()
              
          } catch (error) {
              alert(error);
              console.log(error);
          }
      },
      async updateorgane_controls(payload:any) {
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
              this.fetchorgane_controls()
              
          } catch (error) {
              alert(error);
              console.log(error);
          }
      },
      async deleteorgane_controls(payload:any) {
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
              this.fetchorgane_controls()
              
          } catch (error) {
              alert(error);
              console.log(error);
          }
      }
    }
});
