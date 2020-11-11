import React,{ useEffect, useState } from 'react'

import mapMarkerImg from '../images/map-marker.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowRight, FiPlus} from 'react-icons/fi'
import "../styles/pages/orphanages-map.css"

import { Map,TileLayer, Marker, Popup } from 'react-leaflet'
import mapIcon from '../utils/mapIcon'
import api from '../services/api';


interface Orphanage{
    id:number;
    latitude:number;
    longitude:number
    name:string;
}

function OrphanagesMap(){

    const [orphanages,setOrphanages] = useState<Orphanage[]>([]);
    const h = useHistory();
    

    function goHome() {
        h.push("/");
    }
    console.log(orphanages);

    useEffect(() => {
        api.get('orphanages').then(response => {
        setOrphanages(response.data);            
        })
    },[]);


    return(
        <div id="page-map">
            <aside>
                <header>
                    <button type="button" onClick={goHome}>
                        <img src={mapMarkerImg} alt="Happy"/>
                        
                    </button>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Campinas</strong>
                    <span>São Paulo</span>
                    <Link to="/orphanages/create" className="create-orphanage">
                        <FiPlus size={32} color="#FFF"/>      
                    
                    </Link>
                </footer>
            </aside>


            <Map 
                center={[-22.8775358,-47.0395845]} 
                zoom={15}
                style={{ width: '100%',height:'100%' }}
                >
            
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}

                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orphanages.map(orphanage =>{
                    return(
                        <Marker 
                        position={[orphanage.latitude,orphanage.longitude]} 
                        icon={mapIcon}
                        key={orphanage.id}>
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup" >
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF"/>
                                </Link>

                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

        </div>




    );
}


export default OrphanagesMap;