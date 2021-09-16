class SwapiService {

    _apiBase = 'https://swapi.dev/api';
    _imgBase = 'https://starwars-visualguide.com/assets/img'
    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);
        const body = await res.json();
        if (!res.ok){
            throw new Error (`Could not fetch ${url}, recieved ${res.status}`)
        }
        return body;
    }
    getAllPeople = async()=>{
        const res = await this.getResource(`/people/`);
        return res.results.map((el)=> this._transformPerson(el));
    }
  
    getAllPlanets = async()=>{
      const res = await this.getResource(`/planets/`);
      return res.results.map((el)=> this._transformPlanet(el));
  }
    getAllStarships = async()=>{
      const res = await this.getResource(`/starships/`);
      return res.results.map((el)=> this._transformStarship(el));
    }
    getPerson= async(id)=>{
      const person = await this.getResource(`/people/${id}`);
      return this._transformPerson(person)
    }
  
    getPlanet= async(id)=>{
      const planet = await this.getResource(`/planets/${id}`);
      return this._transformPlanet(planet);
  }
    getStarship = async(id)=>{
      const ship = await this.getResource(`/starships/${id}`);
      return this._transformStarship(ship);
    }
    getPersonImg = (id)=>{
      return `${this._imgBase}/characters/${id}.jpg`;
    }
    getPlanetImg = (id)=>{
      return `${this._imgBase}/planets/${id}.jpg`;
    }
    getStarshipImg = (id)=>{
      return `${this._imgBase}/starships/${id}.jpg`;
    }
    extractId(item){
      const idRegExp = /([0-9]+)/;
      const id = item.url.match(idRegExp)[1];
      return id;
    }
    _transformPlanet=(planet)=>{
      return({
        id: this.extractId(planet),
        name:planet.name,
        population: planet.population,
        rotationReriod: planet.rotation_period,
        diameter: planet.diameter
      })
    }
    _transformPerson=(person)=>{
      return({
        id: this.extractId(person),
        name:person.name,
        gender: person.gender,
        birthYear: person.birth_year,
        eyeColor: person.eye_color
      })
    }

    _transformStarship = (ship)=>{
      return({
        name:ship.name,
        model: ship.model,
        manufacturer: ship.manufacturer,
        costInCredits: ship.cost_in_credits,
        length: ship.length,
        crew: ship.crew,
        passengers: ship.passengers,
        cargoCapacity: ship.cargo_capacity,
        id: this.extractId(ship),
      })
    }
  }
  
export default SwapiService;