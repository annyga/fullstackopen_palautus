const initialState = ''

const noteReducer = (state = initialState, action) => {

    switch(action.type){
        case 'ADD_MESSAGE' :

        return  action.payload

    }
    return state
}

export const setMessage = (msg) => {
    let action ={
        type: 'ADD_MESSAGE',
        payload: msg
    }
    return action
}

export const setEmptyMessage = () => {
    let action = {
        type: 'ADD_MESSAGE',
        payload: ''
    }
    return action
}

export default noteReducer