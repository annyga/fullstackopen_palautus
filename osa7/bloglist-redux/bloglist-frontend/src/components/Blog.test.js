import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'


describe('Testing Blog', () => {


    let blog;
    let user;


    beforeEach( () => {

        blog = {
            "title": "First test",
              "author" : "Andreas",
              "url" : "http://localhost",
              "likes": 0,
              "user": {nimi: "anonymous"}
          }
    
        user = {
            nimi: "anonymous"
        }
    

    })

    test('renders title and author', () => {


        const component = render(
            <Blog 
                blog={blog} 
                user={user}  />
        )
    
        const element = component.getByText('First test Andreas')
    
        expect(element).toBeDefined()
    

    })

    test('doesnt render url', () => {

        const component = render(
            <Blog 
                blog={blog} 
                user={user} 
 />
        )

            
    
        expect(component.container).not.toHaveTextContent('http://localhost')

    })

    test('doesnt render likes', () => {

        const component = render(
            <Blog 
                blog={blog} 
                user={user} />
        )

            
    
        expect(component.container).not.toHaveTextContent('likes')

    })

    test('pressing button and displaying url', () => {


        const mockHandler = jest.fn()

        const component = render(
            <Blog 
                blog={blog} 
                user={user} />
        )

        const button = component.getByText('view')

        fireEvent.click(button)
        
        const element = component.getByText('http://localhost')
    
        expect(element).toBeDefined()    
        

    })

    test('pressing button and displaying likes', () => {


        const mockHandler = jest.fn()

        const component = render(
            <Blog 
                blog={blog} 
                user={user} />
        )

        const button = component.getByText('view')

        fireEvent.click(button)
        
        const element = component.getByText('like')
    
        expect(element).toBeDefined()    
        

    })

    test('pressing like twice', () => {
        const mockHandler = jest.fn()

        
        const component = render(
            <Blog 
                blog={blog} 
                user={user}
                likePost={mockHandler} />
        )

        const button = component.getByText('view')
        fireEvent.click(button)

        const buttonLike = component.getByText('like')

        fireEvent.click(buttonLike)




    })

})
