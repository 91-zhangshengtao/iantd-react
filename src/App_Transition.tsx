import React, { useState } from 'react'
import './styles/index.scss'
import Button from './components/Button'
import Transition from './components/Transition'



function App () {
  const [ show, setShow ] = useState(false)
  return (
    <div className="App">
      <div>
        <Button btnType="default" size="lg" onClick={ () => { setShow(!show) } }>Toggle</Button>
      </div>
      <div>
      <Transition
        in={show}
        timeout={5000}
        animation="zoom-in-top"
        wrapper={false}
      >  
         <ul>
           <li>11111188888888888888888888888888888</li>
           <li>1111118888888888888888888888888888</li>
           <li>111111</li>
           <li>111111</li>
           <li>111111</li>
           <li>111111</li>
           <li>11111188888888888888888888888888888</li>
           <li>11111188888888888888888888888888888</li>
           <li>11111188888888888888888888888888888</li>
           <li>11111188888888888888888888888888888</li>
           <li>11111188888888888888888888888888888</li>
         </ul>
      </Transition>
      <Transition
        in={show}
        timeout={5000}
        animation="zoom-in-left"
        wrapper={true}
      >  
          <Button btnType="primary" size="lg" onClick={ () => { setShow(!show) } }> A large Button </Button>
      </Transition>
      </div>
      
    </div>
  )
}

export default App
