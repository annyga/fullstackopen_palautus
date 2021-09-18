import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors{
        name
        born
        id
    }
}`

export const ADD_AUTHOR = gql`
mutation makeNewAuthor($name: String!, $born: Int, $bookcount: Int){
    addAuthor(
        name: $name,
        born: $born,
        bookcount: $bookcount
    ){
        id
    }
}`


export const ALL_BOOKS = gql`
query{
    allBooks{
        title
        published
        author{
            name
        }
        genres
    }
}`

export const ADD_BOOK = gql`
mutation createBook( $title: String!, $author: ID!, $published: Int!, $genres: [String!]){
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ){
        title
    }
}`

export const CHANGE_BIRTHYEAR = gql`
mutation changeYear($id: ID!, $setBornTo: Int!){
    editAuthor(
        id: $id,
        setBornTo: $setBornTo
    ){
        name
        born
    }
}`

export const LOGIN = gql`
mutation login($username: String!, $password: String!){
    login(
        username: $username,
        password: $password
    ){
        value
        genre
    }
}`

export const BOOK_ADDED = gql`
subscription{
    bookAdded{
        title
    }
}`