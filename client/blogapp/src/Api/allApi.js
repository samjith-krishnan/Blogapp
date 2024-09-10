import commonApi from "./commonApi";

export const getCustomers=(header)=>{
    return commonApi(header,"GET","http://127.0.0.1:8000/post","")
}

export const getCustomerDetail=(id,header)=>{
    return commonApi(header,"GET",`http://127.0.0.1:8000/post/${id}/`,"")
}

export const getComment=(id)=>{
    return commonApi("","GET",`http://127.0.0.1:8000/post/${id}/comments/`,"")
}

export const addCustomer=(data)=>{
    return commonApi("","POST","http://127.0.0.1:8000/users/",data)
}

export const getToken=(data)=>{
    return commonApi("","POST","http://127.0.0.1:8000/token",data)
}

export const getDetail=(header)=>{
    return commonApi(header,"GET","http://127.0.0.1:8000/detail","")
}

export const addComment=(id,header,data)=>{
    return commonApi(header,"POST",`http://127.0.0.1:8000/post/${id}/comment/`,data)
}

export const addPost=(header,data)=>{
    return commonApi(header,"POST","http://127.0.0.1:8000/post/",data)
}

export const getOther=(id,header)=>{
    return commonApi(header,"GET",`http://127.0.0.1:8000/other/${id}`,"")
}

export const addLike=(id,header)=>{
    return commonApi(header,"POST",`http://127.0.0.1:8000/post/${id}/like/`,"")
}

export const deletePost=(id,header)=>{
    return commonApi(header,"DELETE",`http://127.0.0.1:8000/post/${id}/`,"")
}

export const addProfile=(header,data)=>{
    return commonApi(header,"POST",`http://127.0.0.1:8000/profile/`,data)
}

export const editProfile=(header,data)=>{
    return commonApi(header,"PUT",`http://127.0.0.1:8000/profile/`,data)
}

export const logUser=(header)=>{
    return commonApi(header,"GET",`http://127.0.0.1:8000/user/log`,"")
}

export const userLiked=(header)=>{
    return commonApi(header,"GET",`http://127.0.0.1:8000/profile/liked/`,"")
}

export const delUser=(header)=>{
    return commonApi(header,"DELETE",`http://127.0.0.1:8000/user/delete`,"")
}

export const getMessage=(header,id)=>{
    return commonApi(header,"GET",`http://127.0.0.1:8000/user/${id}/message/`,"")
}

export const sentMessage=(header,id,data)=>{
    return commonApi(header,"POST",`http://127.0.0.1:8000/user/${id}/message/`,data)
}