import React from 'react';
import { Dropdown } from 'semantic-ui-react'

//map values to api query data values
const listOption= [
  {
    text:"Advice & How To's",
    value:'advice-how-to-and-miscellaneous'
  },
  {
    text:"Business",
    value:'business-books'
  },
  {
    text:"Crime",
    value:'crime-and-punishment'
  },
  {
    text:"Culture",
    value:'culture'
  },
  {
    text:"Fiction",
    value:'combined-print-and-e-book-fiction'
  },
  {
    text:"Food & Fitness",
    value:'food-and-fitness'
  },
  {
    text:"Non-Fiction",
    value:'combined-print-and-e-book-nonfiction'
  },
  {
    text:"Young Adult",
    value:'young-adult'
  }

]

const ListFormSearch =(props) => {

  return(
    <div>
      <img src="http://lighthousepointlibrary.com/LHP/images/stories/nytimes_bestsellers_logo.jpg"
      alt="book"
      />
      <br></br>
      <Dropdown
        placeholder="Select a list"
        fluid selection options={listOption}
        onChange={props.handleDropdownSelect}
        style={{width:"30%", display:"inline-block"}}
      />
    </div>
  )
}

export default ListFormSearch
