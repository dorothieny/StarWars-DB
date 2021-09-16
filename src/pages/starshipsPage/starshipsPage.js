import React, {Component} from "react";
import ItemsList from "../../components/items-list/items-list";
import Details, { Record } from "../../components/details/details";
import SwapiService from "../../services/swapi-service";
export default class StarshipsPage extends Component{
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
             getData={this.swapiService.getAllStarships}
             onItemSelected={this.onItemSelected}/>
           </div>
           <div className="col-md-6">
             <Details 
             getImg={this.swapiService.getStarshipImg}
             selectedId={this.state.selectedItem} 
             cardName={'starship'}
             getData={()=>this.swapiService.getStarship(this.state.selectedItem)}>

               <Record field='model' label='Model'/>
               <Record field='manufacturer' label='Manufacturer'/>
               <Record field='length' label='Length'/>
               <Record field='crew' label='Crew'/>
               <Record field='passengers' label='Passengers'/>
               <Record field='cargoCapacity' label='Cargo Capacity'/>
               <Record field='costInCredits' label='Cost in credits'/>
               </Details>
           </div>
            </>
         )
    }
}
