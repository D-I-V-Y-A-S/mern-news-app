const data = require('../Data/newsData')
const newsModel = require('../Model/newsModel')

const validateID = async (request, response) => {

    try {
        const givenID = request.body.ID
        const matchingnews = await newsModel.findOne({ newsID: givenID })
        if (matchingnews) {
            return response.status(200).json(matchingnews)
        }
        else {
            return response.status(404).send({ message: "Invalid news Number" })
        }
    }
    catch (error) {
        return response.status(409).send({ message: error.message })
    }
}

module.exports = { validateID }