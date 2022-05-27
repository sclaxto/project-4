import React from 'react'
import { Form, TextArea } from 'semantic-ui-react'

function TextAreaExampleRows(photo, isProfile ) {
  return (
  <Form>
    <TextArea rows={2} placeholder='Tell us more' />
  </Form>
  )
}

export default TextAreaExampleRows