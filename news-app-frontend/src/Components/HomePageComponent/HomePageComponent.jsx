import React, { useEffect, useState } from 'react'
import './HomePageComponent.css'
import axios from 'axios'
import DisplayPageComponent from './DisplayPageComponent'

const HomePageComponent = () => {
    const [news, setnews] = useState([])

    useEffect(() => {
      axios.get('http://localhost:3500/api/v1/news')
        .then(response => setnews(response.data))
        .catch(error => console.log(error.response.data.message))
    }, [])
    return (
      <React.Fragment>
        {/* <div>GetAllnewssComponent</div> */}
        <div className='books'>
          {news && news.map((news, index) => (
            <DisplayPageComponent news={news} key={index} />
          ))}
        </div>
      </React.Fragment>
    )
}

export default HomePageComponent