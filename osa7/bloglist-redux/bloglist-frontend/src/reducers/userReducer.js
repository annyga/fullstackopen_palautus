const initialState = null

const userReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'ADD_USER': 

        return action.payload

        case 'REMOVE_USER':

        return null
    }

    return state
}

export const setUser = (user) => {

    let action = {
        type:'ADD_USER',
        payload:user
    }

    return action
}

export const removeUser = () => {

    let action ={
        type:'REMOVE_USER'
    }

    return action
}

export default userReducer