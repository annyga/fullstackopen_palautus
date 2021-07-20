
const CreateButton = ({loginVisible, setLoginVisible}) => {

    const hide = {display : loginVisible ? 'none' : ''}

    const changeVisible = () =>{
        setLoginVisible(!loginVisible)
    }
    return(
        <div style={hide}>
            <button id="createBlogButton" onClick={changeVisible}>Create new blog</button>
        </div>
    )
}

export default CreateButton