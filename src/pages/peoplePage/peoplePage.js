import React, {Component} from "react";
import ItemsList from "../../components/items-list/items-list";
import Details from "../../components/details/details";
import SwapiService from "../../services/swapi-service";
import { Record } from "../../components/details/details";
export default class PeoplePage extends Component{
    state={
        selectedItem: null
    }
    onItemSelected=(id)=>{
        this.setState({
          selectedItem: id
        })
      }
    swapiService = new SwapiService();
    render(){
        return(
            <>
             <div className="col-md-6">
             <ItemsList 
             renderItem={(item)=> `${item.name}`}
             getData={this.swapiService.getAllPeople}
             onItemSelected={this.onItemSelected}/>
           </div>
           <div className="col-md-6">
             <Details 
             getImg={this.swapiService.getPersonImg}
             selectedId={this.state.selectedItem} 
             cardName={'person'}
             getData={()=>this.swapiService.getPerson(this.state.selectedItem)}>

            <Record field='gender' label='Gender'/> 
            <Record field='birthYear' label='Birth Year'/> 
            <Record field='eyeColor' label='Eye Color'/>   
            </Details>
           </div>
            </>
         )
    }
}
