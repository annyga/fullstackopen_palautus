describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')

      const user ={
          tunnus: "doe",
          salasana: "salasana",
          nimi: "John Doe",
          blogs: []
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.get('#username').type('doe')
          cy.get('#password').type('salasana')
          cy.get('#submit').click()

          cy.contains('John Doe logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('doe')
            cy.get('#password').type('beep')
            cy.get('#submit').click()
  
            cy.contains('wrong username or password')
        })
      })

      describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('doe')
            cy.get('#password').type('salasana')
            cy.get('#submit').click()
        })
    
        it('A blog can be created', function() {

            cy.get('#createBlogButton').click()

            cy.get('#title').type('a new title')
            cy.get('#author').type('a new author')
            cy.get('#url').type('a new url')

            cy.get('#blogSubmit').click()

            cy.contains('a new title a new author')
        })

        it('A blog can be liked', function() {
            cy.get('#createBlogButton').click()

            cy.get('#title').type('a new title')
            cy.get('#author').type('a new author')
            cy.get('#url').type('a new url')

            cy.get('#blogSubmit').click()

            cy.get("#viewBlog").click()
            cy.get("#likeBlog").click()

            cy.contains('1', { timeout: 5000 })
        })

        it('A blog can be removed', function() {
            cy.get('#createBlogButton').click()

            cy.get('#title').type('a new title')
            cy.get('#author').type('a new author')
            cy.get('#url').type('a new url')

            cy.get('#blogSubmit').click()

            cy.get("#viewBlog").click()

            cy.get("#removeBlog").click()

            cy.get('html', { timeout: 5000 }).should('not.contain', 'a new title a new author')
        })

        it('Order blogs according to likes', function() {
          cy.get('#createBlogButton').click()

          cy.get('#title').type('a new title')
          cy.get('#author').type('a new author')
          cy.get('#url').type('a new url')

          cy.get('#blogSubmit').click()
          //second blog
          cy.get('#createBlogButton').click()

          cy.get('#title').type('a second blog')
          cy.get('#author').type('another author')
          cy.get('#url').type('http://localhost')

          cy.get('#blogSubmit').click()
          //third blog
          cy.get('#createBlogButton').click()

          cy.get('#title').type('The third blog in this series')
          cy.get('#author').type('Whoever')
          cy.get('#url').type('http://localhost/test')

          cy.get('#blogSubmit').click()
          //start liking

          cy.contains('a second blog another author').contains('view').click()
          cy.get('#likeBlog').click()
          cy.get('#likeCount', { timeout: 5000 }).should('contain', 1)
          cy.get('#likeBlog').click()
          cy.get('#likeCount', { timeout: 5000 }).should('contain', 2)
          cy.get('#hideBlog').click()

          cy.contains('The third blog in this series Whoever').contains('view').click()
          cy.get('#likeBlog').click()
          cy.get('#likeCount', { timeout: 5000 }).should('contain', 1)
          cy.get('#hideBlog').click()

          cy.get('.blogTitle:first').contains('a second blog').then( item => {
            cy.get('.blogTitle:last').contains('a new title')
          })
          

        })

      })


  })