import React, { FC, ChangeEvent, KeyboardEvent, useState, useEffect, useRef, ReactElement } from 'react'
import classNames from 'classnames'
import Icon from '../icons/icon'
import Input, { InputProps } from '../inputs/input'
import { scopedClass } from '../../utils/scopedClass'
import Transition from '../transitions/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

const sc = scopedClass('chocolate-suggest')

interface DataSourceObject {
  value: string
  zhValue: string
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  width?: number | string;
  renderOption?: (item: DataSourceType) => ReactElement;
}
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    value,
    onSelect,
    width,
    style,
    renderOption,
    ...restProps
  } = props
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [inputValue, setInputValue] = useState(value as string)
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue, 300)
  useClickOutside(componentRef, () => { setShowDropdown(false) })

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSuggestions([])
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          data && setSuggestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        if (results.length > 0) {
          setSuggestions(results)
          setShowDropdown(true)
        } else {
          setShowDropdown(false)
        }
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelectItem(suggestions[highlightIndex])
        }
        break
      case 38:
        highlight(highlightIndex - 1)
        break
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setShowDropdown(false)
        break
      default:
        break
    }
  }
  

  const handleSelectItem = (item: DataSourceType) => {
    setInputValue(item.value)
    onSelect && onSelect(item)
    setShowDropdown(false)
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const renderSuggestions = () => {
    const { size = '' } = restProps
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => { setSuggestions([]) }}
      >
        <ul className={sc('list')} style={{ width: `${width}px` , maxHeight: loading ? 'auto': 300 }}>
          {loading &&
            <div className="suggestions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          }
          {
            suggestions && suggestions.map((item, index) => {
              const classnames = classNames(sc('list-item'), {
                'list-item-sm': size !== 'lg',
                'list-item-lg': size !== 'sm',
                'is-active': index === highlightIndex
              })
              return (
                <li key={index} className={classnames} onClick={() => handleSelectItem(item)}>
                  {renderTemplate(item)}
                </li>
              )
            })
          }
        </ul>
      </Transition>
    )
  }
  return (
    <div className='chocolate-auto-complete' ref={componentRef}>
      <Input
        style={{ width: `${width}px`, ...style }}
        value={inputValue}
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        {...restProps}
      />
      {renderSuggestions()}
    </div>
  )
}

AutoComplete.defaultProps = {
  width: 300,
  disabled: false,
  size: 'sm',
}
export default AutoComplete;