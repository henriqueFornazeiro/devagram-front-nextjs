import axios from "axios";
import { LoadingHelper } from "../helpers/LoadingHelper";

export default class DevagramApiService{
    constructor(){
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL + "/api"
        });

        this.qtdeReq = 0;

        this.axios.interceptors.request.use((config)=>{

            this.qtdeReq++;

            if(this.qtdeReq === 1){
                LoadingHelper.show();
            }

            const token = localStorage.getItem("token");
            if(token){
                config.headers.Authorization =  "Bearer "+token
            }

            return config;
        });

        this.axios.interceptors.response.use((response)=>{
            this.qtdeReq--;
            if(this.qtdeReq === 0){                
                LoadingHelper.hidden();
            }
            return response;
        });

    }

    post(url, data){
        return this.axios.post(url,data);
    };

    get(url){
        return this.axios.get(url)
    }

    put(url, data){        
        return this.axios.put(url,data)
    }


}