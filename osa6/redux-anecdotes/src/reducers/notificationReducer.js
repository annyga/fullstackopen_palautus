import {useSelector } from 'react-redux'

const initialNote = null





const notificationReducer = (state = initialNote, action) => {
    switch(action.type){

        case 'ADD_NOTE':
            return action.payload

        default:
            return state
    }


}
//actioncreators


export const setNotification = (content) => {
        
    let action = {
        type: 'ADD_NOTE',
        payload:  content
    }

    return action
}


export const addNull = () => {
    let action = {
        type: 'ADD_NOTE',
        payload: null
    }

    return action
}

export default notificationReducer