import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import FriendIcon from './FriendIcon'

export default class FriendsAccordion extends Component{

  state = { activeIndex: 1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render(){
    const { activeIndex } = this.state

    return(
      <Accordion fluid styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <h4 className="subhead" style={{textAlign:"left", marginLeft:"0%", marginTop:"2%", fontSize: "0.8em", color:"black"}}> <Icon name='dropdown' /> Friends({this.props.count(this.props.userFriends)})</h4>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {this.props.userFriends.map((friend)=>{
            return <FriendIcon key={friend.id} friend={friend.friend}/>
          })}
        </Accordion.Content>
      </Accordion>
    )
  }
}
