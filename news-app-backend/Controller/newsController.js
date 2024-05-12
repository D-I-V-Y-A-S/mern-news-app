const data = require('../Data/newsData')
const newsModel = require('../Model/newsModel')
const path = require('path')

const getAllnews = async (request, response) => {
    try {
        const news = await newsModel.find()
        
        if (news.length === 0) {
            const news = await newsModel.insertMany(data)
        }
        response.status(200).json(news)
    }
    catch (error) {
        response.status(500).send({ message: error.message })
    }
}

const addnews = async (request, response) => {
    try {
        const { newsID, newsTitle, newsArticle, newsAuthor, newsDate, newsCategory } = request.body
        const existingnews = await newsModel.findOne({ newsID: newsID })
        if (existingnews) {
            return response.status(400).json({ ErrorMessage: 'news already exists' })
        }
        const { filename } = request.file
        const newsImage = 'http://localhost:3500/api/v1/news/images/' + filename

        const newsData =
        {
            newsID: newsID,
            newsTitle: newsTitle,
            newsArticle: newsArticle,
            newsAuthor: newsAuthor,
            newsDate: newsDate,
            newsImage: newsImage,
            newsCategory: newsCategory
        }
        await newsModel.insertMany(newsData)
        JSON.stringify(newsData)
        console.log(JSON.stringify(newsData))
        response.status(201).json({ message: `${newsTitle} added successfully` })
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const updatenews = async (request, response) => {
    try {
        const { newsID, newsTitle, newsArticle, newsAuthor, newsDate, newsCategory } = request.body
        const existingnews = await newsModel.findOne({ newsID: newsID })

        if (!existingnews) {
            return response.status(404).json({ ErrorMessage: 'news with this ID does not exists!' })
        }

        const { filename } = request.file
        const newsImage = 'http://localhost:3500/api/v1/news/images/' + filename

        existingnews.newsID= newsID,
        existingnews.newsTitle= newsTitle,
        existingnews. newsArticle= newsArticle,
        existingnews.newsAuthor= newsAuthor,
        existingnews.newsDate= newsDate,
        existingnews.newsImage= newsImage,
        existingnews.newsCategory= newsCategory
        await existingnews.save()
        response.status(201).json({ message:"data updated successfully!" })
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const deletenews = async (request, response) => {
    const newsToBeDeleted = request.query.newsID;
    try {
        const news = await newsModel.findOne({ newsID: newsToBeDeleted })
        console.log(news)
        if (news) {
            const newsName = news.newsTitle
            await newsModel.deleteOne({ newsID: newsToBeDeleted })
            response.status(200).send({ message: `${newsName} deleted successfully!` })
        }
        else {
            response.status(404).send({ message: "news not found!" })
        }
    }
    catch (error) {
        response.status(500).send({ message: error.message });
    }
}

module.exports = { getAllnews, addnews, updatenews, deletenews }