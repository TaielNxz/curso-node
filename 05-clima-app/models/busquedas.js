const fs = require('fs');
const { default: axios } = require("axios");

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado() {

        return this.historial = this.historial.map( busqueda => {
            // Separar las palabras que componen el nombre de la ciudad
            let palabras = busqueda.split(' ');
            
            // Capitalizar las palabras
            palabras = palabras.map( p => p.charAt(0).toUpperCase() + p.slice(1) );

            // Volver a juntar las palabras
            return palabras.join(' ');
        })
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad( lugar = '' ) {

        try {
            // petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {
            return [];
        }

    }

    async climaLugar( lat , lng ) {

        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}`,
                params: this.paramsWeather
            })

            const resp = await instance.get();

            const { temp , temp_max , temp_min } = resp.data.main;
            const { description } = resp.data.weather[0]

            return {
                temp,
                temp_min,
                temp_max,
                description
            }

        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial( lugar = '' ) {

        if( this.historial.includes( lugar.toLocaleLowerCase() ) ) {
            return;
        }

        this.historial = this.historial.splice(0,5);
        
        this.historial.unshift( lugar.toLocaleLowerCase() );

        // Grabar en DB
        this.guardarDB();

    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );

    }

    leerDB() {

        if( !fs.existsSync(this.dbPath) ) return;
        
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.historial = data.historial;

    }
}

module.exports = Busquedas;