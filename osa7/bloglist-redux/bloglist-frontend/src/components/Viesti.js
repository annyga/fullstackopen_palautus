import React from 'react'
//import PropTypes from 'prop-types'
import {  useSelector } from 'react-redux'



const Viesti = () => {

    const message = useSelector(state => state.notes)

    return(
        <>
            <h3>{message}</h3>
        </>
    )
}

/* Viesti.propTypes = {
    msg: PropTypes.string.isRequired
  } */

export default Viesti