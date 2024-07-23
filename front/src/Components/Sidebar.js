import React, {useEffect, useState} from "react";
import axios from "axios";
import {LinearProgress, List} from "@mui/material";
import UserItem from "./UserItem";
import Box from '@mui/material/Box';


export default function Sidebar(){
    const BASE_URL = `http://127.0.0.1:8000/`
    const [userList, setuserlist] = useState([])
    const [userLoader, setuserLoader] = useState(true)
    const getAuthTokenFromCookie =() => {
        const cookies = document.cookie.split(';')
        for (const cookie in cookies){
            const [name, value] = cookies[cookie].trim().split("=");
            if(name === "token"){
                return  value
            }
        }
        return null
    }
    useEffect(() => {
        const authToken = getAuthTokenFromCookie()
        if(authToken){
            axios.get(`${BASE_URL}api/users/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }).then(response => {
                setuserlist(response.data)
                setuserLoader(false)
            }).catch(error => {
                console.log("Error making API request: ", error)
            })
        }
    }, [])
    return(
        <>
            <div  className='sidebar'>
                {userLoader ? (<Box  sx={{width: '100%'}}>
                    <LinearProgress/>
                </Box>):
                    (<List sx={{width : '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                            {userList.map((user, index) => (
                                <UserItem key={index} email={user.email} name={`${user.first_name} ${user.last_name}`} id={user.id}></UserItem>
                            ))}
                        </List>)
                }
            </div>
        </>
    )
}