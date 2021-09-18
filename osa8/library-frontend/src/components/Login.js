import React, { useState, useEffect} from 'react'
import {LOGIN} from '../queries'
import { useMutation } from '@apollo/client'

const Login = ({setToken, setPage, show}) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');



    const [loginUser, result] = useMutation(LOGIN, {
        onError: (error) => {
          console.log(error.graphQLErrors[0].message)
        }
    });

    useEffect(() => {
        if ( result.data ) {
            const genre = result.data.login.genre
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token);
            localStorage.setItem('user-genre', genre);
            
        }
      }, [result.data])

      if (!show) {
        return null
      }

    const handleLogin = async (event) => {
        event.preventDefault()

        await loginUser({variables: {username, password}})

        setPage('authors')

    }

    return(

        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                name<input type='text' onChange={ ({target}) => {setUserName(target.value) }}/>
                <br/>
                password<input type='text' onChange={ ({target}) => {setPassword(target.value) }}/>
                <br/>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default Login;