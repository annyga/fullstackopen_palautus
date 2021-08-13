import userService from '../services/users'
import { useState } from 'react'
import { Link } from "react-router-dom"

const Users = () => {

    const [lista, setLista] = useState([])
    
    userService.getAllUsers()
   .then(res => setLista(res) )

   if (lista.length === 0) {
       return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <td>
                            <strong>user</strong>
                        </td>
                        <td>
                            <strong>blogs created</strong>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
       )
   }

   

    return(
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <td>
                            <strong>user</strong>
                        </td>
                        <td>
                            <strong>blogs created</strong>
                        </td>
                    </tr>
                </thead>
                <tbody>
                {lista.map( item => <tr key={item.id}><td><Link to={'/users/' + item.id}>{item.nimi}</Link></td><td>{item.blogs.length}</td></tr>)} 
                </tbody>
            </table>
            
        </div>
    )
}

export default Users