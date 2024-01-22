import { BASE_URL } from "./Baseurl";
import { commonApi } from "./commonApi";

// add employee

export const addUser=async(body,header)=>{
    return await commonApi("POST",`${BASE_URL}/add`,body,header)
}


// get employee

export const allusers=async(search)=>{
    return await commonApi("GET",`${BASE_URL}/get-all-users?search=${search}`,"")
}

// delete data

export const deleteUser=async(id)=>{
    return await commonApi("DELETE",`${BASE_URL}/delete-user/${id}`,{})
}

// edit employee

export const editUser=async(id,body,header)=>{
    return await commonApi("PUT",`${BASE_URL}/edseit-ur/${id}`,body,header)
}