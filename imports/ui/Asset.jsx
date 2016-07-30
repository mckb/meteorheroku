import React, { Component, PropTypes } from 'react';


// Asset component - represents a single asset item
export default class Asset extends Component {
    render() {
        return(
             <li>
                 <span>
                     { this.props.asset.text }
                 </span>
                 <span>
                    { this.props.asset.value }
                 </span>
             </li>
        );
    }
}

Asset.propTypes = {
    // This component gets the asset to display through a React prop.
    // We can use propTypes to indicate it is required
    asset: PropTypes.object.isRequired,
};