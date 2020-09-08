import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Alert } from "./alert";

describe('test Alert Component', ()=>{
  it('should hidden when close Alert', async()=>{
    const wrapper = render(<Alert message="note" closable/>)
    const testContainer = wrapper.container.querySelector('.alert-close-icon') as HTMLElement
    // const testAlert = wrapper.container.querySelector('.alert-wrapper') as HTMLElement
    fireEvent.click(testContainer)
    await waitFor(() => {
      // expect(testAlert).not.toBeVisible()
    })
  })

  it('should render correct Alert based on closable props', () => {
    const wrapper = render(<Alert message="note" closable/>)
    const testContainer = wrapper.container.querySelector('.alert-wrapper') as HTMLElement
    expect(testContainer).toHaveClass('alert-closable')
  })
})