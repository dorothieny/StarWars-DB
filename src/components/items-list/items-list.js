import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import './items-list.css';

export default class ItemsList extends Component {
  state = {
    itemList: null
  }
  componentDidMount(){
    const {getData} = this.props;
    getData()
      .then((itemList)=>{
        this.setState({itemList})
      })
  }
  render() {

    const {itemList} = this.state;
    const {onItemSelected} = this.props;
    if(!itemList){
      return <Spinner/>
    }
    const elements = itemList.map((item)=>{
      const {id} = item;
      const label = this.props.renderItem(item)
      return(
        <li 
        key={id}
        className='list-group-item'
        onClick={()=>onItemSelected(id)}>
          {label}
        </li>
      )
    });

    return (
      <ul className="item-list list-group">
        {elements}
      </ul>
    );
  }
}