import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service'
import './random-planet.css';
import Spinner from '../spinner/spinner'
import Error from '../error-element/error-element'
export default class RandomPlanet extends Component {
  
  swapiService = new SwapiService();
  state={
    planet:{ },
    loading: true,
    error: false
  }

  constructor(){
    super();
    this.updatePlanet();
  }

  onError= (err)=>{
    this.setState({
      error:true,
      loading: false
    })
  }
  updatePlanet(){
    const id= Math.floor(Math.random()*25)+2;
    // const id = 12000;
    this.swapiService.getPlanet(id)
    .then((planet)=>{
      this.setState({
        planet,
      loading: false})
    })
    .catch(this.onError)
  }

  render() {
    const {loading, planet, error} = this.state;
    if(loading){
      return <Spinner/>
    }
    const elem = loading? <Spinner/>: <Planet planet={planet}/>
    if(error){
      return(
        <Error/>
      )
    }
    return (
      <>
      <div className="random-planet jumbotron rounded">
      {elem}
      </div>

      </>
    );
  }
}

const Planet = ({planet})=>{

  const {name,population, rotationReriod, diameter, id} = planet;
  return(
    <>
    <img className="planet-image"
            alt='smth'
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationReriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </>
  )
}