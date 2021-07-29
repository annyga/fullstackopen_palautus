import { createAnecdote } from '../reducers/anecdoteReducer'
import {  addNull, setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

let timeoutID;

const AnecdoteForm = (props) => {
    
    //const dispatch = useDispatch()

    const add = (event) => {
        event.preventDefault()
        clearTimeout(timeoutID)
        const content = event.target.anecInput.value
    
    
        props.createAnecdote(content)
        props.setNotification(`you added new anecdote: ${content}`)
        event.target.anecInput.value = ''
        timeoutID = setTimeout( () => {
          props.addNull()
        }, 5000)
      }


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecInput" /></div>
                <button type="submit">create</button>
        </form>
      </div>
    )
}

const mapDispatchToProps =  {createAnecdote, setNotification, addNull}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm