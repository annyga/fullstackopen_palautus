import React from "react";

const Notification = ({message, klass}) => {

    if (message === null){
        return null;
    }else{
        return(
            <div className={klass}>
                {message}
            </div>
        )
    }

}

export default Notification;