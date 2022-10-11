import { useState } from "react";
import axios from 'axios';

const methods = ['request','get','delete','head','options','post','put','patch'];

const useAxios = (opts = {}) => {
    const [isLoading,setIsLoading] = useState(false);

    const instance = axios.create(opts);

    const getAlias = (name) => {
        return async (...params) => {
            try{
                setIsLoading(true);
                let res;
                if(opts.url) res = await instance[name](opts.url, ...params);
                else res = await instance[name](...params);
                setIsLoading(false);
                return res.data;
            }
            catch(err){
                setIsLoading(false);
                throw err;
            }
        }
    }

    const returnObj = { isLoading };
    methods.forEach(method => returnObj[method] = getAlias(method));
    return returnObj;
}

// This hook returns a modified instance of axios
// This modified instance consist of 'loading' state in addition to all the methods provided by axios instance
// Instance is created with options object given to useAxios, eg. useAxios({ baseURL: 'http://localhost:3000' })
// There are some differences to methods of this instance also
// If url is specified in options provided to useAxios hook, then there is no need to provide it in methods of this modified instance
// eg. const {post} = useAxios({ url: 'localhost:3000' })
// await post(data, config); //No need to provide url here

export default useAxios;