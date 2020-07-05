import React from 'react'
import './styles/index.scss'
import Button from './components/Button'
const a = '123'
if(a == '123'){
}
function App () {
  return (
    <div className="App">
      {/* Button */}
      <div>
        <Button className="testclass">className</Button>
        <Button autoFocus>autoFocus</Button>
        <Button size="lg"> large button </Button>
        <Button size="sm"> small button </Button>
        <Button size="sm" disabled>disabled small button </Button>
      </div>
      <div>
        <Button btnType="primary"> primary button </Button>
        <Button btnType="danger"> danger button </Button>
        <Button btnType="link" href="https://google.com" target="_blank"> link button </Button>
        <Button btnType="link" href="https://google.com" target="_blank" disabled>disabled link button </Button>
        <Button onClick={ () => { alert('button click') } }> click button </Button>
      </div>
      
    </div>
  )
}

export default App
