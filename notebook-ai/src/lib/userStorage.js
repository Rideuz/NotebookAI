import {supabase} from "./auth.js";

export async function getUser(email){
    try{
        const { data, error } = await supabase.rpc('get_user', { semail: email })
        localStorage.setItem("userData", JSON.stringify(data));

        if(error){
            console.log(error.message)
        }
    } catch (error){
        console.error(error);
    }
}

export function removeUserData() {
    localStorage.removeItem("userNotes");
    localStorage.removeItem("userData");
}

export function getUserData() {
    return JSON.parse(localStorage.getItem("userData")); // Преобразуем строку обратно в объект
}

export async function getUserNotes(id){
    console.log("notes_id", id);
    try{
        const { data, error } = await supabase.rpc('get_notes', { userid: id })
        console.log("notes_data", data)

        if(error){
            console.log(error.message)
        }

        return data;
    } catch (error){
        console.error(error);
    }
}

