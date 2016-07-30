import React, { Component, PropTypes } from 'react';


// BitCoinTicker component - represents a single ticker item
export default class BitCoinTicker extends Component {
    render() {
        return(
            <li>
                 <span>
                     Bitcoin[Bitstamp]: ${ this.props.ticker.value }
                 </span>
            </li>
        );
    }
}

BitCoinTicker.propTypes = {
    // This component gets the ticker to display through a React prop.
    // We can use propTypes to indicate it is required
    ticker: PropTypes.object.isRequired,
};
