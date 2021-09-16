import React, {Component} from "react";
import ItemsList from "../../components/items-list/items-list";
import Details, { Record} from "../../components/details/details";
import SwapiService from "../../services/swapi-service";
export default class PlanetsPage extends Component{
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
             renderItem={(item)=> `${item.name} (${item.diameter})`}
             getData={this.swapiService.getAllPlanets}
             onItemSelected={this.onItemSelected}/>
           </div>
           <div className="col-md-6">
             <Details 
             getImg={this.swapiService.getPlanetImg}
             selectedId={this.state.selectedItem} 
             cardName={'planet'}
             getData={()=>this.swapiService.getPlanet(this.state.selectedItem)}>
             
              <Record field='population' label='Population'/>
              <Record field='rotationPeriod' label='Rotation Period'/> 
              <Record field='diameter' label='Diameter'/> 
              </Details>
           </div>
            </>
         )
    }
}
