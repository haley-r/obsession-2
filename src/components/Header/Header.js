import React, { useContext } from 'react';

import ThingsContext from '../../gameContext';


function Header() {

    const things = useContext(ThingsContext)   

    return (
        <div className="Header">
            <h2>Obsession</h2>
            <p>Username: </p>
            <h3>this is what context has</h3>
                <ul>
                    {JSON.stringify(things)}
                </ul>
        </div>
    );
}

export default Header;