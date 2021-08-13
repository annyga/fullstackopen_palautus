import { Button } from 'react-bootstrap'

const CreateButton = ({loginVisible, setLoginVisible}) => {

    const hide = {display : loginVisible ? 'none' : ''}

    const changeVisible = () =>{
        setLoginVisible(!loginVisible)
    }
    return(
        <div style={hide}>
            <Button id="createBlogButton" onClick={changeVisible}>Create new blog</Button>
        </div>
    )
}

export default CreateButton