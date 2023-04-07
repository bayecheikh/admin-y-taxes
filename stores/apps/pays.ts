import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axiosServices';
const router = useRouter();
const listGraphql = `{
    countries(sort:[NAME_ASC]){
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
export const usepaysStore = defineStore({
    id: 'Pays',
    state: () => ({
        payss: [],
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        /* async fetchpayss() {
            try {
                const response = await axios.get('/api/payss');
                this.payss = response.data.payss;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        } */
        async fetchpayss() {
            try {
                const response = await axiosServices.post('/map/graphql/',{query:listGraphql});
                this.payss = response.data?.data?.countries?.edges
                console.log("Liste des pays ++++++++++++", response.data.data.countries?.edges)
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async addpayss(payload:any) {
            try {
                const response = await axiosServices.post('/map/graphql/',
                {
                    query:`mutation{
                        registerCountry(isoCode:"${payload.isoCode}",name:"${payload.name}"){
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
                console.log("Resultat ajout ++++++++++++", response)
                this.fetchpayss()
                
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async updatepayss(payload:any) {
            try {
                const response = await axiosServices.post('/map/graphql/',
                {
                    query:`mutation{
                        updateCountry(id:"${parseInt(payload.id)}",isoCode:"${payload.isoCode}",name:"${payload.name}"){
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
                this.fetchpayss()
                
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async deletepayss(payload:any) {
            try {
                const response = await axiosServices.post('/map/graphql/',
                {
                    query:`mutation{
                        deleteCountry(id:"${parseInt(payload.id)}"){
                            code
                            message
                            success
                        }
                        
                    }`
                });
                console.log("Resultat supression ++++++++++++", response)
                this.fetchpayss()
                
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
