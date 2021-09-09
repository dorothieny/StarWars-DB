class SwapiService {

    _apiBase = 'https://swapi.dev/api'
    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);
        const body = await res.json();
        if (!res.ok){
            throw new Error (`Could not fetch ${url}, recieved ${res.status}`)
        }
        return body;
    }
    async getAllPeople(){
        const res = await this.getResource(`/people/`);
        return res.results;
    }
  
    async getAllPlanets(){
      const res = await this.getResource(`/planets/`);
      return res.results.map((el)=> this._transformPlanet(el));
  }
    async getAllStarships(){
      const res = await this.getResource(`/starships/`);
      return res.results;
    }
  
    async getPerson(id){
      const person = await this.getResource(`/people/${id}`);
      return this._transformPerson(person)
    }
  
    async getPlanet(id){
      const planet = await this.getResource(`/planets/${id}`);
      return this._transformPlanet(planet);
  }
    async getStarship(id){
      const ship = await this.getResource(`/starships/${id}`);
      return this._transformPSpaceship(ship)
    }

    extractId(item){
      const idRegExp = /\/([0-9]*)\/$/;
      const id = item.url.match(idRegExp)[1];
      return id;
    }
    _transformPlanet(planet){
      return({
        id: this.extractId(planet),
        name:planet.name,
        population: planet.population,
        rotationReriod: planet.rotation_period,
        diameter: planet.diameter
      })
    }
    _transformPerson(person){
      return({
        id: this.extractId(person),
        name:person.name,
        gender: person.gender,
        birthYear: person.birthYear,
        eyeColor: person.eyeColor
      })
    }

    _transformPSpaceship(spaceship){
      return({
        id: this.extractId(spaceship),
        name:spaceship.name,
        model: spaceship.model,
        manufacturer: spaceship.manufacturer,
        costInCredits: spaceship.costInCredits,
        length: spaceship.length,
        crew: spaceship.crew,
        passengers: spaceship.passengers,
        cargoCapacity: spaceship.cargoCapacity
      })
    }
  }
  
export default SwapiService;