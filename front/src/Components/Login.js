import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import axios from "axios";

function Login(){
    const BASE_URL = 'http://127.0.0.1:8000/';
    const [formData, setFormData] = useState({
        'email': "",
        'password': ""
    })
    const handleFormLogin = () => {
        console.log(JSON.stringify(formData))
        fetch(`${BASE_URL}login/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                const token = data.token;
                document.cookie = `token=${token}; path=/`
            }).catch(error => {
                console.log(error);
        })
    }
    return(
        <div className='container text-center'>
            <div className='mt-3'>
                <TextField id="email" type='email' label="Email" variant="outlined" onChange={e => setFormData({...formData, email:e.target.value})} />
            </div>
            <div className='mt-3'>
                <TextField id="password" type='password' label="Password" variant="outlined" onChange={e => setFormData({...formData, password:e.target.value})}/>
            </div>
            <div className='mt-3'>
                <Button variant='contained' onClick={handleFormLogin}>Login</Button>
            </div>
        </div>
    )
}

export default Login;
