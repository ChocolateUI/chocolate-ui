import React from 'react'
import { render } from '@testing-library/react'
import { Alert } from "../alert";

describe('test Alert Component', ()=>{
  it('should render correct Alert based on closable props', () => {
    const wrapper = render(<Alert message="note" closable/>)
    const testContainer = wrapper.container.querySelector('.alert-wrapper') as HTMLElement
    expect(testContainer).toHaveClass('alert-closable')
  })
})