import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import axiosServices from '@/utils/axios';
const router = useRouter();
<<<<<<< HEAD
=======
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
        createdAt
        updatedAt
        regions{
          edges{
            node{
              id
              name
              code
              departments{
                edges{
                  node{
                    id
                    name
                    code
                  }
                }
              }
            }
          }
        }
      }
    }
    }
}`;
>>>>>>> crud-base
export const usepaysStore = defineStore({
    id: 'Pays',
    state: () => ({
        payss: [],
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchpayss() {
            try {
                const response = await axios.get('/api/payss');
                this.payss = response.data.payss;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
