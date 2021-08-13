const initialState = []

const blogReducer = (state = initialState, action) => {

    switch(action.type){

        case 'ADD_BLOG':

            return state.concat(action.payload)

        case 'ADD_ALL_BLOGS' :

            return action.payload

    }

    return state
}

export const setBLog = (newBlog) => {

    let action = {
        type: 'ADD_BLOG',
        payload: newBlog
    }
    return action
}

export const setAllBlogs = (blogs) => {
    
    let action = {
        type: 'ADD_ALL_BLOGS',
        payload: blogs
    }
    return action
}



export default blogReducer