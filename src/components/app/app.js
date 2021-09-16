import React, {Component} from 'react';
import './app.css'
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import PeoplePage from '../../pages/peoplePage/peoplePage'
import PlanetsPage from '../../pages/planetsPage/planetsPage'
import StarshipsPage from '../../pages/starshipsPage/starshipsPage'

class App extends Component {

  state = {
    randomDisplay: true,
    selectedPerson: null,
    hasError: false,
  }

  onTogglePlanet = () =>{
    this.setState(({randomDisplay})=>{
      return{
        randomDisplay: !randomDisplay
      }
    })
  }
  onItemSelected=(id)=>{
    this.setState({
      selectedPerson: id
    })
  }

  componentDidCatch(){
    this.setState({
      hasError: true
    })
  }
  render(){
    if(this.state.hasError){
      <span>Error!!!!</span>
    }
    const element = this.state.randomDisplay? <RandomPlanet/>: null;
    return (
      <div className='app'>
        <Header />
        {element}
        <button 
        onClick={this.onTogglePlanet}
        style={{margin:'0 0 40px',
                border: 'none',
                width: '200px',
                borderRadius: '5px',
                color: 'white', 
                background: '#777'}}>
                  Toggle planet</button>
        <div className="row mb2">
      <PeoplePage/>
      <PlanetsPage/>
      <StarshipsPage/>
        </div>
      </div>
    );
  }
};

export default App;