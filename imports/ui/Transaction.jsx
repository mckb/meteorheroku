import React, { Component, PropTypes } from 'react';
import { Transactions } from '../api/transactions.js';

export default class Transaction extends Component {

    render() {
        return (
            <li className = { '' } >

                <header>
                    <sup className="text"> { this.props.transaction.date.toString() } </sup>
                    <b className="text"><p> { this.props.transaction.transType }</p></b>
                    <kbd className="text"> { this.props.transaction.text } </kbd>
                </header>
            </li>
        );
    }
}

Transaction.propTypes = {
    // This component gets the transaction to display through a React prop.
    // We can use propTypes to indicate it is required
    transaction: PropTypes.object.isRequired,
};