
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  //const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {notification : state.notifications}
}

const ConnectedNotes = connect(mapStateToProps)(Notification)

export default ConnectedNotes