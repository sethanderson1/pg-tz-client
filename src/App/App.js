import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './App.css'

const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

function App() {
  const [dates, setDates] = useState('')
  const dayjsUTC = dayjs().utc().format()

  useEffect(() => {
    console.log('useEffect ran')


    async function getDates() {
      const url = `https://young-lake-61831.herokuapp.com/`

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },
          // body: JSON.stringify(date)
        })
        const returnedDate = await res.json();
        console.log('returnedDate', returnedDate)
        const convertedToLocalTimestamp = dayjs(returnedDate.timestamp).format()
        const convertedToLocalTimestamptz = dayjs(returnedDate.timestamptz).format()

        returnedDate.convertedToLocalTimestamp = convertedToLocalTimestamp
        returnedDate.convertedToLocalTimestamptz = convertedToLocalTimestamptz
        const listDates = () => {
          return Object.entries(returnedDate)
            .map(date => (<li >{date[0] + '....' + date[1]}</li>))
        }
        setDates(listDates())
        console.log('convertedToLocalTimestamp', convertedToLocalTimestamp)
        console.log('convertedToLocalTimestamptz', convertedToLocalTimestamptz)
      } catch (err) {

      };
    };

    getDates()
  }, [])




  return (
    <main className='App'>

      <h6>
        <ul>{dates}</ul>

      </h6>

    </main>
  );
}

export default App;