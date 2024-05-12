import React, { useState } from 'react'
import './HomePageComponent.css'

const DisplayPageComponent = ({ news }) => {

    //likes and comments
    const [Like, setLike] = useState(news.likes)
    const [Comment, setComment] = useState(news.comments)

    const incrementComment = () => {
        setComment(prevComment => prevComment + 1);
    }
    const incrementCount = () => {
        setLike(prevLike => prevLike + 1);
    }

    //modifying date data 
    const dateString = news.newsDate;
    const date = new Date(dateString);
    const dateFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('en-GB', dateFormatOptions);
    const formattedDate = dateFormatter.format(date);

    return (
        <React.Fragment>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>

            <div className='card'>
                <div className="text-container">

                    <h3 style={{ color: "gray" }}>{news.newsID}</h3>
                    <img src={news.newsImage} alt="news-post" height="200px" width="310px" />
                    <h2 className='status'> {news.newsTitle}</h2>
                    <p className='status'> {news.newsArticle}</p>
                    <span style={{ color: "deeppink" }}>{news.newsCategory}</span>
                    <p className='author'>{news.newsAuthor},{formattedDate}</p>

                    <div className='align'>
                        <button style={{ backgroundColor: "green" }}>READ MORE</button>

                        {news.likes && news.comments && (
                            <div className='feedback'>
                                <div className='response'>
                                    <i onClick={incrementCount} className="bi bi-heart-fill"></i>
                                    {Like}
                                    <span style={{ marginLeft: '15px' }} > < i onClick={incrementComment} className="bi bi-chat-left-fill"></i></span>
                                    {Comment}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default DisplayPageComponent
