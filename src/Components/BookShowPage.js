import React, { Component } from 'react';

export default class BookShowPage extends Component {

  render(){
    // console.log(this.props.selectedBookData)

    return(
      <div>
        {this.props.selectedBookData.volumeInfo.title}
      </div>
    )
  }
}
