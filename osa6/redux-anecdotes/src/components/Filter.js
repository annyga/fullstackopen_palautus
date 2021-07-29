import React from 'react'
import { addWord } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  //const dispatch = useDispatch()

/*   const handleChange = (event) => {
  
    dispatch(addWord(event.target.value))
  } */
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(event) => props.addWord(event.target.value)} />
    </div>
  )
}

const mapDispatchToProps =  {addWord}



const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter