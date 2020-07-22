import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import PropTypes from 'prop-types';
interface DataSourceObject {
  value: string;
}
/** 
 *   DataSourceType<T = {}>  T传参
 *   输出: T & DataSourceObject
 */
export type DataSourceType<T = {}> = T & DataSourceObject

// 忽略Omit<InputProps, 'onSelect'>
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 过滤下拉选项 */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 选中下拉选项 */
  onSelect?: (item: DataSourceType) => void;
  /** 自定义下拉选项 */
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  // useState
  const [ inputValue, setInputValue ] = useState(value as string)
  const [ suggestions, setSugestions ] = useState<DataSourceType[]>([]) // 过滤下拉列表
  const [ loading, setLoading ] = useState(false)
  const [ showDropdown, setShowDropdown] = useState(false)
  const [ highlightIndex, setHighlightIndex] = useState(-1)

  // useRef
  const triggerSearch = useRef(false) // 
  const componentRef = useRef<HTMLDivElement>(null)

  // 自定义useState
  const debouncedValue = useDebounce(inputValue, 300) // 防抖 return 防抖后的inputValue

  // 调用hook中的方法
  useClickOutside(componentRef, () => { setSugestions([])}) // 初始化过滤下拉选项列表

  // useEffect --防抖处理
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSugestions([]) // 初始化 过滤下拉列表
      const results = fetchSuggestions(debouncedValue)
      /* 是否是Promise对象  results instanceof Promise */
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSugestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSugestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        } 
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1) // 初始化高亮
  }, [debouncedValue, fetchSuggestions])
  // 高亮效果
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  // onKeyDown 键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // console.log('e.keyCode:',e.keyCode);
    
    switch(e.keyCode) {
      // 回车键盘
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      // 上键
      case 38:
        highlight(highlightIndex - 1)
        break
      // 下键
      case 40:
        highlight(highlightIndex + 1)
        break
      // esc
      case 27:
        setShowDropdown(false)
        break
      default:
        break
    }
  }
  // onChange input事件
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  // select 搜索下拉选项事件
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  // 自定义下拉选项 Template
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    console.log('suggestions：',suggestions)
    
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {setSugestions([])}}
      >
        <ul className="viking-suggestion-list">
          { loading &&
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin/>
            </div>
          }
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }

  // render
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {(suggestions && suggestions.length) ? generateDropdown() : ''}
    </div>
  )
}

export default AutoComplete;

