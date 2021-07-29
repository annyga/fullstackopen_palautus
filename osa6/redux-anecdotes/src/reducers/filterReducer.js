


const filterReducer = (state = '', action) => {

    switch(action.type){

        case 'ADD_WORD':
            return action.payload
        
        default :
            return state
    }

}
//actioncreators
export const addWord = (word) => {
    let action = {
        type: 'ADD_WORD',
        payload: word
    }

    return action
}


export default filterReducer