import axios from "axios"

const commonApi=(reqheader,reqMethod,reqUrl,reqBody)=>{

    const config={
        method:reqMethod,
        url:reqUrl,
        data:reqBody,
        headers:reqheader ? reqheader:{"Content-Type":"application/json"}
    }
    return axios(config)
    
}
export default commonApi