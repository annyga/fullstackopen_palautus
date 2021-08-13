const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog');

const api = supertest(app)

const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 50
    }
  ]

  beforeEach( async() => {
      await Blog.deleteMany({})
      let blogObject = new Blog(blogs[0])
      await blogObject.save();
      blogObject = new Blog(blogs[1])
      await blogObject.save();
  })


  describe('First Api tests', () => {

    test('return all blogs', async() => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(blogs.length);
    })

    test('Returns id and not _id', async() => {
        expect (await api.get('/api/blogs')).toBeDefined();

        
    })

    test('add one blog', async() => {
        let newBlog =     {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10
          }

          await api.post('/api/blogs')
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)

    })

    test('new post with no likes', async() => {
        let newBlog =         {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: null
          }

          const resultBlog = await api.post('/api/blogs')
          .send(newBlog)

          const response = await api.get('/api/blogs/')

          let blogPostIndex = response.body.findIndex(item => item.title === newBlog.title);

          expect(response.body[blogPostIndex].likes).toBe(0)
          
          
    })

    test('No title post', async() => {
      let newBlog =         {
        title: null,
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 5,
      }
      
      await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
    })

    test('No url post', async() => {
      let newBlog =         {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: null,
        likes: 5,
      }
      
      await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
    })


  })



afterAll(() => {
    mongoose.connection.close()
  })