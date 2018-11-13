import React from 'react';
import { Form, Input } from 'semantic-ui-react'

const KeywordSearchForm = (props) => {

  return(
    <Form onSubmit={props.handleInputSubmit} style={{padding:"2%"}}>

    <Form.Field name='userInput' onChange={props.handleInputChange}>
    <Input
    style={{width:"40%"}}
    size='huge'
    icon='search'
    placeholder='Search...'
    value={props.userInput}
    />
    </Form.Field>

    </Form>

  )

}
export default KeywordSearchForm
