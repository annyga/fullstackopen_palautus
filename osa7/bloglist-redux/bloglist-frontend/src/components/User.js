import userService from '../services/users'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'


const User = () => {

    const [user, setUser] = useState(null)
    const _isMounted = useRef(true)
    const { id } = useParams()

    useEffect( () => {
        userService.getOneUser(id)
        .then(response => setUser(response))

        return () => { 
            _isMounted.current = false;
        }
    }, [])


    if (!user){
        return null
    }

    if (!_isMounted.current){
        return null
    }

    return (
        <div>
            <h2>{user.nimi}</h2>
            <h3>added blogs</h3>
            {user.blogs.map( item => <p key={item.id}>{item.title}</p>)}
        </div>
    )
}

export default User