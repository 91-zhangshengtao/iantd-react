import React from 'react'
import './styles/index.scss'
import Input from './components/Input'
import AutoComplete from './components/AutoComplete'
import { DataSourceType } from './components/AutoComplete/autoComplete'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { mockChannel } from '@storybook/addons'
library.add(fas)

interface GithubUserProps {
  // login: string;
  // url: string;
  // avatar_url: string;
}

function App () {
  // 自定义下拉选项模板
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <h2>名称: {itemWithGithub.value}</h2>
        {/* <p>url: {itemWithGithub.url}</p> */}
      </>
    )
  }
  // fetch
  const handleFetch = (query: string) => {
    // api 
    // return fetch(`https://api.github.com/search/users?q=${query}`)
    //   .then(res => res.json())
    //   .then(({ items }) => {
    //     console.log(items)
    //     return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
    //   })

    // mock
    let MockData =  [
        {value: 'bradley', number: 11},
        {value: 'pope', number: 1},
        {value: 'caruso', number: 4},
        {value: 'cook', number: 2},
        {value: 'cousins', number: 15},
        {value: 'james', number: 23},
        {value: 'AD', number: 3},
        {value: 'green', number: 14},
        {value: 'howard', number: 39},
        {value: 'kuzma', number: 0},
      ]
      return MockData.slice(0, 10).filter((item: any) => item.value.indexOf(query) > -1)
  }
  return (
    <div className="App" style={{paddingLeft:"0px",paddingTop:"10px"}}>
      {/* Input */}
      <div style={{ display: "flex", justifyContent:"flex-start"}}>
        AutoComplete：
        <AutoComplete 
          style={{width:"300px"}}
          fetchSuggestions={handleFetch}
          onSelect={e => alert(`${e.value}  selected`)}
          renderOption={renderOption}
        />
      </div>
    </div>
  )
}

export default App
