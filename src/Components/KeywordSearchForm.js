import React from 'react';
import { Form, Input, Radio } from 'semantic-ui-react'

const KeywordSearchForm = (props) => {

  return(
    <Form onSubmit={props.handleInputSubmit}>
    <Form.Field>
    <Radio
    name='radioGroup'
    label='author'
    value='author'
    onChange={props.handleRadioChange}
    />
    </Form.Field>

    <Form.Field>
    <Radio
    name='radioGroup'
    label='title'
    value='title'
    onChange={props.handleRadioChange}
    />
    </Form.Field>

    <Form.Field>
    <Radio
    name='radioGroup'
    label='all'
    value='all'
    onChange={props.handleRadioChange}
    />
    </Form.Field>


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
