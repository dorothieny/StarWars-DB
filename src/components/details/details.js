import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './details.css';

const Record = ({item, field, label})=>{
  return(
        <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
      </li>
  )
}
export {Record};

export default class Details extends Component {
  swapiService = new SwapiService();
  
  state= {
    item: null,
    getImg: null
  }

  componentDidMount(){
    this.upDateState();
  }
  componentDidUpdate(prevProps){
    if(this.props.selectedId !== prevProps){
      this.upDateState();
    }
    
  }
  
  upDateState(){
    const {getData, selectedId, getImg} =this.props;
    if(!selectedId){
      return;
    }
      getData()
      .then(item=>{
        this.setState({
          item,
          getImg: getImg(selectedId)
        })
      })
    }    
  
  render() {

    const {cardName} = this.props;
    const {item, getImg} = this.state;
    if(!this.state.item){
      return <span>Select {cardName}</span>
    }

    return(
      <div className="person-details card">
          <img className="person-image"
          alt="snth"
            src={getImg} />
          <div className="card-body">
            <h4>{item.name}</h4>
            <ul className="list-group list-group-flush">
                {
                  React.Children.map(this.props.children, (child, idx)=>{
                    return React.cloneElement(child, {item})
                  })
                }  
            </ul>
          </div>
        </div>
    )
  }
}

