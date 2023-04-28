import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axiosServices';
const router = useRouter();
const listGraphql = `{
    departments(sort:[ID_ASC]){
      edges{
        node{
          id
          name
          code
          regionId
          region{
            id
            name
            code
          }        
        }
      }
    }
}`;
export const usedepartementStore = defineStore({
    id: 'departement',
    state: () => ({
        departements: [],
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        /* async fetchdepartements() {
            try {
                const response = await axios.get('/api/departements');
                this.departements = response.data.departements;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        } */
        async fetchdepartements() {
            try {
                const response = await axiosServices.post('/map/graphql/',{query:listGraphql});
                this.departements = response.data?.data?.departments?.edges
                console.log("Liste des departements ++++++++++++", response)
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async adddepartements(payload:any) {
          try {
              const response = await axiosServices.post('/map/graphql/',
              {
                  query:`mutation{
                      registerDepartment(code:"${payload.code}",regionId:"${payload.regionId}",name:"${payload.name}"){
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
              this.fetchdepartements()
              
          } catch (error) {
              alert(error);
              console.log(error);
          }
      },
      async updatedepartements(payload:any) {
          try {
              const response = await axiosServices.post('/map/graphql/',
              {
                  query:`mutation{
                      updateDepartment(id:"${parseInt(payload.id)}",code:"${payload.code}",regionId:"${payload.regionId}",name:"${payload.name}"){
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
              this.fetchdepartements()
              
          } catch (error) {
              alert(error);
              console.log(error);
          }
      },
      async deletedepartements(payload:any) {
          try {
              const response = await axiosServices.post('/map/graphql/',
              {
                  query:`mutation{
                    deleteDepartment(identifier:"${parseInt(payload.id)}"){
                        code
                        message
                        success
                    }
                      
                  }`
              });
              console.log("Resultat supression ++++++++++++", response)
              this.fetchdepartements()
              
          } catch (error) {
              alert(error);
              console.log(error);
          }
      }
    }
});
