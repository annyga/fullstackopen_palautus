import React from 'react'
import PropTypes from 'prop-types'



const Viesti = (props) => {

    return(
        <>
            <h3>{props.msg}</h3>
        </>
    )
}

Viesti.propTypes = {
    msg: PropTypes.string.isRequired
  }

export default Viesti