import anecdoteService from '../services/anecdotes';



let anecdotesAtStart = []


const anecdoteReducer = (state = anecdotesAtStart, action) => {



  let newAnecdote;
  let newState;

  switch(action.type){


    case 'VOTE': 
    
      return state.map( item => 
        item.id !== action.id ? item : {...item, votes: item.votes + 1} 
      )

    case 'ADD' :

        let newState = [...state, action.payload]

        return newState
    
      case 'INIT' : 

        return action.payload

    default:
      return state
  }
  
}
//actioncreators
export const createAnecdote = (data) => {

  return async (dispatch) => {

    const anecdotesoteObject = await anecdoteService.addAnecdote({content:data, votes: 0})

    dispatch({type: 'ADD', payload:anecdotesoteObject})
  }


}

export const initializeAnecdote = () => {

  return async (dispatch) => {
    const content = await anecdoteService.getAll()
    dispatch({type: 'INIT', payload: content})
  }

  
}

export const addVote = (anec) => {

  return async (dispatch) => {
    const content = await anecdoteService.addVoteToAnecdote(anec)
    dispatch({type: 'VOTE',id: content.id})
  }

}

export default anecdoteReducer