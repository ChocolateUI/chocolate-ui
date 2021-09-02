/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { render } from '@testing-library/react'
import Select, { SelectProps } from '../select'
import Option from '../selectOption'
jest.mock('../../icons/icon.tsx', () => {
  const React = require('react');
  return () => {
    return <i className="fa" />
  }
})
const testProps: SelectProps = {
  disabled: false,
  onChange: jest.fn(),
}

const generateSelect = (props: SelectProps) => {
  return (
    <Select onChange={() => console.log('object')}>
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