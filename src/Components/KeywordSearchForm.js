import React from 'react';
import { Form, Input, Radio } from 'semantic-ui-react'

const KeywordSearchForm = (props) => {

  return(
    <Form onSubmit={props.handleInputSubmit} style={{padding:"2%"}}>
    <Form.Field>
    <Radio
    name='radioGroup'
    label='author'
    value='inauthor'
    className="subhead"
    style={{fontSize:"1em", fontWeight:"bold"}}
    onChange={props.handleRadioChange}
    />
    </Form.Field>

    <Form.Field>
    <Radio
    name='radioGroup'
    label='title'
    value='intitle'
    className="subhead"
    style={{fontSize:"1em", fontWeight:"bold"}}
    onChange={props.handleRadioChange}
    />
    </Form.Field>

    <Form.Field>
    <Radio
    name='radioGroup'
    label='all'
    value='all'
    className="subhead"
    style={{fontSize:"1em", fontWeight:"bold"}}
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
