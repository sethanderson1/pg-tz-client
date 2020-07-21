import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

function App() {

  const dayjsUTC = dayjs().utc().format()
  
  useEffect(() => {
    console.log('useEffect ran')

    async function postDate(date) {
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
      } catch (err) {

      };
    };

    postDate(date)
  }, [])


  

  return (
    <main className='App'>

      <h6>
        {/* {dayjsAttempt()} */}
      </h6>

    </main>
  );
}

export default App;