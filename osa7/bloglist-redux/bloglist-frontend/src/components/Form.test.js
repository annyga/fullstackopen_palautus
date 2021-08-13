import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Form from './Form'

describe('Form tests', () => {


    test('Testing 5.16', () => {

        let title = "Study hard"
        let author = "professor"
        let url = "http://localhost"


        const mockHandler = jest.fn()

        const component = render (
            <Form
            onSubmit={mockHandler}
            title={title}
            author={author}
            url={url}/>
        )

        const element = component.container.querySelector("title")


    })
})