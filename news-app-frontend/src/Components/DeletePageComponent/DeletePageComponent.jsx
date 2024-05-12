import React, { useState } from 'react'
import './DeletePageComponent.css'
import axios from 'axios'

const DeletePageComponent = () => {
    const [newsInfo, setnewsInfo] = useState({
        newsID: '',
        newsTitle: '',
        newsArticle: '',
        newsAuthor: '',
        newsCategory: '',
        newsImage: '',
      })
    
      const inputHandler = (event) => {
        const { name, value } = event.target
        setnewsInfo({
          ...newsInfo, [name]: value
        })
      }
    
      const { newsID,
        newsTitle,
        newsArticle,
        newsAuthor,
        newsCategory,
        newsImage} = newsInfo;
    
      const newsIdValidator = async () => {
        // event.preventDefault()
        await axios.post('http://localhost:3500/api/v1/news/validate', { ID: newsInfo.newsID })
          .then(response => {
            console.log(response.data)
            var data = response.data
            if (data) {
              setnewsInfo({
                ...newsInfo,
                newsTitle: data.newsTitle,
                newsArticle: data.newsArticle,
                newsAuthor: data.newsAuthor,
                newsCategory: data.newsCategory,
                newsImage: data.newsImage,
              });
            }
          })
          .catch(error => {
            alert(`Status ${error.response.status}-${error.response.data.message}`);
          })
      };
    
      const formSubmitHandler = (event) => {
        event.preventDefault()
        console.log(newsInfo)
        axios.delete(`http://localhost:3500/api/v1/news?newsID=${newsInfo.newsID}`)
          .then(response => {
            alert(response.data.message)
            window.location.href = '/'
          })
          .catch(error => alert(`Status ${error.response.status}-${error.response.data.message}`))
    
      };
      return (
        <form className='form-container' onSubmit={formSubmitHandler}>
          <h2>Delete a news</h2>
    
          <div className='form-group'>
            <label>NEWS ID</label>
            <input
              type='text'
              placeholder='Enter the news ID'
              value={newsID}
              name="newsID"
              onChange={inputHandler}
              pattern="N+[0-9]{3,}"
              required
            />
          </div>
    
          <div>
            <button type="button" onClick={newsIdValidator}>Check</button>
          </div>
    
          <div className='form-group'>
            <label>NEWS TITLE</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter the news title'
              value={newsTitle}
              name="newsTitle"
              onChange={inputHandler}
              required
            />
          </div>
    
          <div className='form-group'>
            <label>NEWS ARTICLE</label>
            <textarea rows="4" placeholder='Enter the news article'
              value={newsArticle}
              name="newsArticle"
              onChange={inputHandler}
              required cols="50" />
          </div>
    
          <div className='form-group'>
            <label>NEWS AUTHOR</label>
            <input
              type='text'
              placeholder='Enter the genre'
              value={newsAuthor}
              name="newsAuthor"
              onChange={inputHandler}
              required
            />
          </div>
    
          <div className='form-group'>
            <label>NEWS CATEGORY</label>
            <select className='select-field'
              type='text'
              placeholder='Enter the news category'
              value={newsCategory}
              name="newsCategory"
              onChange={inputHandler}
              required
            >
            <option value=''>--SELECT--</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Technology">Technology</option>
              <option value="World">World</option>
              <option value="Science">Science</option>
              <option value="Politics">Politics</option>
              <option value="Culture">Culture</option>
              <option value="Entertainment">Entertainment</option>
              </select>
          </div>

          { newsImage && <img src={newsImage} alt="image" width="300px" />}
    
          <div>
            <button type='submit'>DELETE</button>
          </div>
        </form>
      );
}

export default DeletePageComponent