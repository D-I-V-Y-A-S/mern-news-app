const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema(
    {
        newsID: {
            type: String,
            required: true,
            unique: true
        },
        newsTitle: {
            type: String,
            required: true,

        },
        newsArticle: {
            type: String,
            required: true,
        },
        newsAuthor: {
            type: String,
            required: true,

        },
        newsCategory: {
            type: String,
            required: true,
            enum: ["Health",
                "Environment",
                "Finance",
                "Technology",
                "World",
                "Science",
                "Politics",
                "Culture",
                "Entertainment"]
        },
        newsImage: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            default:1,
            required:true
        },
        comments: {
            type: Number,
            default:1,
            required:true
        },
        newsDate: {
            type: Date,
            required: true
        }
    }, { collection: 'news' })

module.exports = mongoose.model('news', newsSchema)