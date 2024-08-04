import React from 'react'
import './app.scss'

const App = () => {
  let ask = async () => {
    let response = await fetch(`http://localhost:${process.env.BACK_PORT}/api`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'name'
      })
    })
    let text = await response.text()
    console.log(text)
  }
  return (
    <div>
      <div>App!!!!!!!!!</div>
      <button onClick={ask}>Get answer</button>
    </div>
  )
}

export default App;
