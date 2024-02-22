import { useState } from 'react'
import Router1 from './routing/Router1'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router1 />
    </>
  )
}

export default App
