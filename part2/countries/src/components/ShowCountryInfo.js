import React, { useState } from 'react';
import CountryInfo from './CountryInfo';


const ShowCountryInfo = ({country}) => {
    const [infoShown, setInfoShown] = useState(false);

    const handleShowInfo = () => {
      setInfoShown(!infoShown)
    };
    
    return(
        <div>            
            <div>
                {country.name} {' '}
                <button onClick={handleShowInfo}>{infoShown ? 'hide' : 'show'} </button>
            </div>
            {infoShown && <CountryInfo country={country}/>}
        </div>
    );
  };

export default ShowCountryInfo;
