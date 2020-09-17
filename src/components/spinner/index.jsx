import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

import './style.scss';

const Spinner = () => {
        return (
            <Loader className='spinner' active inline='centered' content='Завантаження...' />

        )
}

export default Spinner
