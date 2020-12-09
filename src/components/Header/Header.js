import React, { useContext } from 'react';

import ThingsContext from '../../gameContext';


function Header() {
    const games = useContext(ThingsContext)

    const things = useContext(ThingsContext)   

    return (
        <div class="Header">
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