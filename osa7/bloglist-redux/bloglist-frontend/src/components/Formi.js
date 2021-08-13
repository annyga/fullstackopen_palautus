import { Form, FormGroup, Button } from 'react-bootstrap'

const Formi = ({createNewBlogPost, title, author, url, setTitle, setAuthor, setUrl, loginVisible, setLoginVisible}) => {

    const hide = {display: loginVisible ? '' : 'none' }

    const cancelCreation = () => {
        setLoginVisible(!loginVisible)
    }

    return(
        <div style={hide}>
            <h2>create new</h2>
            <Form onSubmit={createNewBlogPost}>
                <FormGroup>
                    <Form.Label>title</Form.Label>
                    <Form.Control id="title" type="text" name="title" value={title} onChange={({target}) => setTitle(target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Form.Label>author</Form.Label>
                    <Form.Control id="author" type="text" name="author" value={author} onChange={({target}) => setAuthor(target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Form.Label>url</Form.Label>
                    <Form.Control id="url" type="text" name="url" value={url} onChange={({target}) => setUrl(target.value)}/>
                </FormGroup>
                <Button id="blogSubmit" type="submit">create</Button>               
            </Form>
            <Button variant='danger' onClick={cancelCreation}>cancel</Button>
        </div>

    )
}



export default Formi