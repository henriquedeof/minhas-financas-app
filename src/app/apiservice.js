import Axios from "axios";

const httpClient = Axios.create({
    //baseURL: 'http://localhost:8080'
    baseURL: 'https://henrique-financas-api.herokuapp.com/'
});

class Apiservice {

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    post(url, objeto){
        return httpClient.post(this.createRequestUrl(url), objeto);
    }

    put(url, objeto){
        return httpClient.put(this.createRequestUrl(url), objeto);
    }

    delete(url){
        return httpClient.delete(this.createRequestUrl(url));
    }

    get(url){
        return httpClient.get(this.createRequestUrl(url));
    }

    createRequestUrl(url){
        return `${this.apiUrl}${url}`; //String Template (ECMA Script)
    }
    
}

export default Apiservice;