import React from 'react';
import mapMarkerImg from '../images/map-marker.svg';
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi'
import '../styles/components/sidebar.css'

export default function Sidebar(){
  const {goBack} = useHistory();
  const h = useHistory();
  
  function goHome() {

    h.push('/');    
  }
    return(
        <aside className="app-sidebar">

        <button type="button" onClick={goHome}>
          <img onClick={goHome} src={mapMarkerImg} alt="Happy" />
        </button>
        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside> 
    );
}