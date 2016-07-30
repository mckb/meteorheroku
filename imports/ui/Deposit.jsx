/* Deposit Funds Into Plexxus Account */
import { Deposits } from '../api/deposits.js';
{/*<h1>Message Op-Log</h1>
<form className="messages" onSubmit={ this.handleSubmitNumberMessages.bind( this )}>
<input
type="number"
ref="numberOfMessages"
placeholder="Type number of messages to display"
min="5"
    />
    <input type="submit" value="Submit"/>
    </form>*/}

import React, { Component, PropTypes } from 'react';

{/*<sup className="text"> { this.props.deposit.date.toString() } </sup>
 <b className="text"><p> { this.props.deposit.transType }</p></b>
 <kbd className="text"> { this.props.deposit.text } </kbd>*/}


export default class Deposit extends Component {
    handleSubmitDeposit(event){
        event.preventDefault();
        alert("this is a submit deposit");
        const dateDeposited = Date();
        let userName = Meteor.user().username;
        const amountToDepositInputDOMNode = ReactDOM.findDOMNode( this.refs.depositAmount );
        const cardNumberInputNode = ReactDOM.findDOMNode(this.refs.cardNumber);

        Deposits.insert({
            user: userName,
            amount: amountToDepositInputDOMNode.value.trim(),
            cardNumber: cardNumberInputNode.value.trim(),
            date: dateDeposited,//current time
        });
    }
    render() {
        return (
            <div>
                <h1>Deposit-Component</h1>
                <form className="" onSubmit={ this.handleSubmitDeposit.bind(this) } >
                    Amount to deposit: £
                    <input
                        type="number"
                        ref="depositAmount"
                        min="10"
                        max="1000"
                    />
                    <br/>
                    16-digit card number:
                    <input
                        type="text"
                        pattern="[0-9]{16}"
                        ref="cardNumber"
                    />
                    <br/>
                    3-digit code
                    <input
                        type="text"
                        pattern="[0-9]{3}"
                        ref="securityCode"
                    />
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}


Deposit.propTypes = {
    // This component gets the transaction to display through a React prop.
    // We can use propTypes to indicate it is required
//    deposit: PropTypes.object.isRequired,
};