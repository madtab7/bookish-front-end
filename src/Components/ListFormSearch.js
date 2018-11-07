import React from 'react';
import { List } from 'semantic-ui-react'


const ListFormSearch =(props) => {

  return(
    <List link>
      <List.Item
        as="a"
        value='advice-how-to-and-miscellaneous'
        onClick={props.handleDropdownSelect}
        style={{fontSize:"1.3em", fontWeight:"bold"}}
      > Advice & How To's </List.Item>
      <List.Item
        as="a"
        value='business-books'
        onClick={props.handleDropdownSelect}
        style={{fontSize:"1.3em", fontWeight:"bold"}}
      > Business </List.Item>
      <List.Item
        as="a"
        value='crime-and-punishment'
        onClick={props.handleDropdownSelect}
        style={{fontSize:"1.3em", fontWeight:"bold"}}
      > Crime </List.Item>
      <List.Item
        as="a"
        value='culture'
        onClick={props.handleDropdownSelect}
        style={{fontSize:"1.3em", fontWeight:"bold"}}
      > Culture </List.Item>
      <List.Item
        as="a"
        value='combined-print-and-e-book-fiction'
        onClick={props.handleDropdownSelect}
        style={{fontSize:"1.3em", fontWeight:"bold"}}
      > Fiction </List.Item>
      <List.Item
        as="a"
        value='food-and-fitness'
        onClick={props.handleDropdownSelect}
        style={{fontSize:"1.3em", fontWeight:"bold"}}
      > Food & Fitness </List.Item>
      <List.Item
        as="a"
        value='combined-print-and-e-book-nonfiction'
        onClick={props.handleDropdownSelect}
        style={{fontSize:"1.3em", fontWeight:"bold"}}
      > Non-Fiction </List.Item>
      <List.Item
        as="a"
        value='young-adult'
        onClick={props.handleDropdownSelect}
        style={{fontSize:"1.3em", fontWeight:"bold"}}
      > Young Adult </List.Item>
    </List>
  )
}

export default ListFormSearch
