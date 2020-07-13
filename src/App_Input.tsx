import React from 'react'
import './styles/index.scss'
import Input from './components/Input'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faFileExcel } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function App () {
  return (
    <div className="App" style={{paddingLeft:"0px",paddingTop:"10px"}}>
      {/* Input */}
      <div style={{ display: "flex", justifyContent:"space-around"}}>
        <Input
          style={{width: '300px'}}
          placeholder="placeholder"
          onChange={e => alert(`${e.target.value}  changed`)}
        />
        <Input
          style={{width: '300px'}}
          placeholder="disabled input"
          disabled 
        />
      </div>
      <div style={{ display: "flex", justifyContent:"space-around"}}>
        <Input
          style={{width: '300px'}}
          defaultValue="prepend text"
          prepend="https://"
        />
        <Input
          style={{width: '300px'}}
          defaultValue="google"
          append=".com"
        />
      </div>
      <div style={{ display: "flex", justifyContent:"space-around"}}>
        <Input
          style={{width: '300px'}}
          placeholder="input with icon"
          icon="search"
        />  
        <Input
          style={{width: '300px'}}
          defaultValue="large size"
          size="lg"
        />
        <Input
          style={{width: '300px'}}
          placeholder="small size"
          size="sm"
        />
      </div>
      
    </div>
  )
}

export default App
