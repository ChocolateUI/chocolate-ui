import React from 'react'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import Select, { SelectProps } from './select'
import Option from './selectOption'

const testProps: SelectProps = {
  disabled: false,
  onChange: jest.fn(),
}

const generateSelect = (props: SelectProps) => {
  return (
    <Select>
      <Option value='lucy'> lucy </Option>
      <Option value='liming'> liming </Option>
    </Select>
  )
}

describe('test Select Component in default props', ()=>{
  beforeEach(()=>{
    const wrapper = render(generateSelect(testProps))
  })
  it('should correct render option on props', ()=>{
     
  })


})