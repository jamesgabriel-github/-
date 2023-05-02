import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        'Accept': 'application/json',
        // 'Authorization' : `Bearer 59|YNpHTNcYELwKbkDya8mHc0GBHpgSV7kFgz1pcKet`
    },
    withCredentials:true
});

export default axios;