import React, { useState } from 'react'
import './EditPageComponent.css'
import axios from 'axios';

const EditPageComponent = () => {

  const [newsInfo, setnewsInfo] = useState({
    newsID: '',
    newsTitle: '',
    newsArticle: '',
    newsAuthor: '',
    newsDate: Date.now(),
    newsCategory: '',
    newsImage: ''
  })

  const { newsID,
    newsTitle,
    newsArticle,
    newsAuthor,
    newsCategory,
    newsDate,
    newsImage } = newsInfo;


  const inputHandler = (event) => {
    const { name, value } = event.target
    setnewsInfo({
      ...newsInfo, [name]: value
    })
  }

  const imageHandler = (event) => {
    const file = event.target.files[0]
    setnewsInfo({ ...newsInfo, newsImage: event.target.files[0] })
    console.log(event.target.files[0])
    console.log(file.name)
  }

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
            newsDate: data.newsDate,
            newsImage: data.newsImage,
          });
        }
      })
      .catch(error => {
        alert(`Status ${error.response.status}-${error.response.data.message}`);
      })
  };


  const formSubmitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    // formData.append(name, value) – add a form field with the given name and value,
    formData.append('newsID', newsID)
    formData.append('newsTitle', newsTitle)
    formData.append('newsArticle', newsArticle)
    formData.append('newsAuthor', newsAuthor)
    formData.append('newsCategory', newsCategory)
    formData.append('newsDate', newsDate)
    formData.append('newsImage', newsImage)
    console.log(formData)

    await axios.patch('http://localhost:3500/api/v1/newss', formData)
      .then(response => {
        alert(response.data.message)
        window.location.href = '/'
      }
      )
      .catch(error => alert(JSON.stringify(error.response.data)))
  }

  return (
    <form className='form-container' onSubmit={formSubmitHandler}>
      <h2>Update a new news</h2>

      <div className='form-group'>
        <label>NEWS ID</label>
        <input
          type='text'
          placeholder='Enter the news ID'
          value={newsID}
          pattern="+[0-9]{3,}"
          name="newsID"
          onChange={inputHandler}
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
        <textarea rows="4" cols="50" placeholder='Enter the news article'
          value={newsArticle}
          name="newsArticle"
          onChange={inputHandler}
          required />
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

      <div className='form-group'>
        <label>To edit image,upload here!</label>
        <input
          type='file'
          onChange={imageHandler}
          required
        />
      </div>

      <div>
        <button type='submit'>UPDATE</button>
      </div>
    </form>
  );
}

export default EditPageComponent