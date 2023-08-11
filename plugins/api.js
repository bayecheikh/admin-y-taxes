export default function ({ $axios, store ,redirect}, inject) {
    const token = localStorage.getItem('msasToken')
    
    const msasApi = $axios.create({
            baseURL: process.env.baseUrl,
            headers : {
                common: {
                Accept: 'application/json'/* ,
                Authorization: 'Bearer ' + token */
                }
            }
        }        
    )

    msasApi.onRequest(config => {
        //Ajoute le token avant chaque request
        const token = localStorage.getItem('msasToken')
        config.headers.common['Authorization'] = `Bearer ${token}`; 
    })

    msasApi.onResponse((response) => {
        /* if (response.status === 404) {
            console.log('Page 404')
        } */
        console.log('Reponse ----- : ',response.data.mmsasage)
    })

    msasApi.onError((error) => {
        console.log('**************************-----------------error: ',error.response)
        let code = parseInt(error.response && error.response.status)
        console.log('**************************-----------------code: ',code)
        let mmsasage = error.response.data.message
        console.log('**************************-----------------mmsasage: ',mmsasage)

        //Deconnecte l'utilisateur si le token n'est plus valide
        if (code === 401) {
            localStorage.removeItem('msasToken')
            localStorage.removeItem('loggedInUser')
            localStorage.removeItem('layout')
            localStorage.removeItem('isAuthenticated') 
            this.$toast.show('Votre session a expiré. Veuillez vous reconnecter!').goAway(4000)
            this.$router.push('/login');
        }
    })

    /** Api for file submit ************************************************/

    const msasFileApi = $axios.create({
        baseURL: process.env.baseUrl,
        headers : {
            common: {
            Accept: 'application/json'/* ,
            Authorization: 'Bearer ' + token */
            }
        }
    }        
    )

    msasFileApi.onRequest(config => {
        //Ajoute le token avant chaque request
        const token = localStorage.getItem('msasToken')
        config.headers.common['Authorization'] = `Bearer ${token}`; 
        config.headers.common['Content-Type'] = 'multipart/form-data'; 
        /* config.headers.common['Content-Type'] = `multipart/form-data`;  */
    })

    msasFileApi.onResponse((response) => {
        /* if (response.status === 404) {
            console.log('Page 404')
        } */
        console.log('Reponse ----- : ',response.data.mmsasage)
    })

    msasFileApi.onError(error => {
        /* const code = parseInt(error.response && error.response.status)
        if (code === 400) {
        redirect('/400')
        } */
    })

    /** Api for Export ************************************************/

    const msasExportApi = $axios.create({
        baseURL: process.env.baseUrl,
        headers : {
            common: {
            Accept: 'application/json'/* ,
            Authorization: 'Bearer ' + token */
            }
        }
    }        
    )

    msasFileApi.onRequest(config => {
        //Ajoute le token avant chaque request
        const token = localStorage.getItem('msasToken')
        config.headers.common['Authorization'] = `Bearer ${token}`; 
        config.headers.common['Content-Type'] = 'multipart/form-data'; 
        config.headers.common['Response-Type'] = 'arraybuffer'; 
        /* config.headers.common['Content-Type'] = `multipart/form-data`;  */
    })

    msasFileApi.onResponse((response) => {
        /* if (response.status === 404) {
            console.log('Page 404')
        } */
        console.log('Reponse ----- : ',response.data.mmsasage)
    })

    msasFileApi.onError(error => {
        /* const code = parseInt(error.response && error.response.status)
        if (code === 400) {
        redirect('/400')
        } */
    })

    inject('msasApi', msasApi)
    inject('msasFileApi', msasFileApi)
    inject('msasExportApi', msasFileApi)
    
}