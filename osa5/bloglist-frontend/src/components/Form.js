
const Form = ({createNewBlogPost, title, author, url, setTitle, setAuthor, setUrl, loginVisible, setLoginVisible}) => {

    const hide = {display: loginVisible ? '' : 'none' }

    const cancelCreation = () => {
        setLoginVisible(!loginVisible)
    }

    return(
        <div style={hide}>
            <h2>create new</h2>
            <form onSubmit={createNewBlogPost}>
                <div>
                    title<input id="title" type="text" name="title" value={title} onChange={({target}) => setTitle(target.value) }></input>
                </div>
                <div>
                    author<input id="author" type="text" name="author" value={author} onChange={({target}) => setAuthor(target.value)}></input>
                </div>
                <div>
                    url<input id="url" type="text" name="url" value={url} onChange={({target}) => setUrl(target.value)}></input>
                </div>
                <button id="blogSubmit" type="submit">create</button>               
            </form>
            <button onClick={cancelCreation}>cancel</button>
        </div>

    )
}



export default Form