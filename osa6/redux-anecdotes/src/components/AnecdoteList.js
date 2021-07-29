import { addVote } from '../reducers/anecdoteReducer'
import { addNoteVote, addNull, setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'


let timeoutID;//timer

const AnecdoteList = () => {
     
    const anecdotes = useSelector(state => state.anecdotes)
    const filterWord = useSelector(state => state.filter)
    
    const dispatch = useDispatch()

    //voting 
    const vote = (anecdote) => {
        clearTimeout(timeoutID) //timer
        dispatch(addVote(anecdote))
        dispatch(setNotification(`You voted ${anecdote.content}`))

        timeoutID = setTimeout( () => {
            dispatch(addNull())
        }, 5000)
    }

    return(
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes ).map(anecdote =>           
                anecdote.content.includes(filterWord) ? 
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
                : null
            )}
        </div>
    )
}

export default AnecdoteList