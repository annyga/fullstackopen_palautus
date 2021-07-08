

const dummy = (blogs) => {

    return 1;
}

const totalLikes = (blogs) => {

    const laskija = (sum, item) => {
        return sum + item.likes;
    }

    return blogs.length === 0 ? 0 : blogs.reduce( laskija, 0 )
    
    

}


const favoriteBlog = (blogs) => {

    const findIndex = (maxInd, item, i, arr) => {
        return item.likes > arr[maxInd].likes ? i : maxInd
    }

    let index = blogs.reduce(findIndex, 0);

    return blogs[index];

}

const mostBlogs = (blogs)=> {

    
}

module.exports = {dummy, totalLikes, favoriteBlog};