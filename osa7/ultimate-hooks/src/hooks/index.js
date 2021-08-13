import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    const [updated, setupdated] = useState(1)
  
    useEffect( () => {
      axios.get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
      .catch( error => {
        console.log(error)
      })
    },[updated])
  
  
    const create = (resource) => {
      axios.post(baseUrl, resource)
      .then(response => {
        console.log(response)
        setupdated(Math.random() * 100)
      })
      .catch(error => {
        console.log(error)
      })
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }
  