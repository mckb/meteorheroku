import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Griddle from 'griddle-react';
import Dropdown from 'react-drop-down';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


import { Assets } from '../api/assets.js';
import { Contacts } from '../api/contacts.js';
import { Transactions } from '../api/transactions.js';
import { Tickers } from '../api/tickers.js';
import { Deposits } from '../api/deposits.js';

import Asset from './Asset.jsx'; // <--- Replaced by Griddle
import Deposit from './Deposit.jsx';
import Contact from './Contact.jsx';
import Transaction from './Transaction.jsx';
import BitCoinTicker from './BitCoinTicker.jsx';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

/* Pusher ################################################## */
/* Pusher ################################################## */

import Pusher from 'pusher-js';

Pusher.logToConsole = true;

let pusher = new Pusher('de504dc5763aeef9ff52', {
    encrypted: true
});
let channel = pusher.subscribe('live_trades');

let NUMBER_OF_MESSAGE = 5;

const soundWav = "data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
let playSound = (function beep() {

    let snd = new Audio( soundWav );
    return function() {
        snd.play();
    }
})();

/* Pusher ################################################## */
/* Pusher ################################################## */

// App component - represents the whole app
class App extends Component {


    /* We'll need to initialize the value of -this.state.hideCompleted-
     in the component's -constructor- */
    constructor( props ) {
        super( props );

    }

    componentWillMount( ){
        let tickerPrice = 0;
        channel.bind('trade', function(data){
            // this.state = { bitCoinprice: data.price };
            // console.log("Price is here>>> " + data.price);
            const createdDate = Date();
            tickerPrice = data.price || 0;
            Tickers.insert({
                eventRecord : data,
                value: tickerPrice,
                date: createdDate,
                type: "Bitcoin",
            });
        });
        this.state =  {
            hideContact: false,
            numberMessages: 5,
            contactSelected: "",
            bitCoinprice: tickerPrice
        }
    }

    /* Event Handlers */
    handleSubmit( event ) {
        event.preventDefault();

        /*  Find the text field via the React -ref-
            In React you handle DOM events by directly referencing a method on the component.
            Inside the event handler, you can reference elements from the component by giving
            them a ref property and using ReactDOM.findDOMNode */
        const nameTextInputDOMNode = ReactDOM.findDOMNode( this.refs.nameTextInput );
        const numberOfTokensInputDOMNode = ReactDOM.findDOMNode( this.refs.numberOfTokensInput );
        const text = nameTextInputDOMNode.value.trim();
        const value = parseInt( numberOfTokensInputDOMNode.value.trim() );
        const createdDate = Date();

        //const text = ReactDOM.findDOMNode( this.refs.nameTextInput ).value.trim();
        //const value= parseInt(ReactDOM.findDOMNode( this.refs.numberOfTokensInput ).value.trim());

        /*  Inserting into a collection.
            Inside the event handler, we are adding a contact to the Contacts collection by calling
            Contacts.insert(). Being able to insert anything into the database from the client
            isn't very secure, but it's okay for now.*/
        Contacts.insert({
            text,
            value,
            /* We can assign any properties to the Contacts object, such as the time created,
               since we don't ever have to define a schema for the collection. */
            createdAt: createdDate, // <-- current time
        });
        Transactions.insert({
            text,
            value,
            /* We can assign any properties to the Contacts object, such as the time created,
             since we don't ever have to define a schema for the collection. */
            date: createdDate,//current time
            transType: "New Contact",
        });
        /* clear form */
        nameTextInputDOMNode.value = '';  // <-- reset -textInput- value
        numberOfTokensInputDOMNode.value = '';  // <-- reset -textInput- value
    }

    handleSubmitNumberMessages(event){
        event.preventDefault();

        const numberOfMessagesInputDOMNode = ReactDOM.findDOMNode( this.refs.numberOfMessages );
        const value = parseInt( numberOfMessagesInputDOMNode.value.trim() );
        this.setState({numberMessages: value});
        numberOfMessagesInputDOMNode.value = '';  // <-- reset -textInput- value

    }

    toggleHideContact() {
        /*  We can update -this.state- from an event handler by calling -this.setState-,
            which will update the state property asynchronously and then cause
            the component to re-render: */
        this.setState({
            hideContact: ! this.state.hideContact,
        });


    }

    /* Replaced by Griddle Component
    renderAssets() {
        return this.props.assets.map( ( asset ) => (
            <Asset key={ asset._id } asset={ asset } />
        ));

    } */

    /* this.props.contacts.map((contact)=>(
        contact.text));
    */

    renderContacts() {
        let filteredContacts = this.props.contacts;
        /* filter out contacts when -this.state.hideContact- is true: */
        if ( this.state.hideContact ) {
            filteredContacts = filteredContacts.filter(contact => !contact.checked);
        }
        if ( this.state.hideContact ) {
            const contactListMetadata = [{
                "columnName": "text",
                "displayName": "Name"
            }, {
                "columnName": "value",
                "displayName": "Token Balance"
            }];
            return < Griddle
                results={ filteredContacts }
                columnMetadata={ contactListMetadata }
                columns={ [ "text", "value" ] }/>;
        } else {
            return filteredContacts.map( (contact) => (
                < Contact key={ contact._id } contact={ contact }/>
            ));
        }
    }

    handleChangeContactSelected( selectedContact ){
        this.setState( { contactSelected: selectedContact } );
        console.log("handle: " + selectedContact );

    }

    handleSubmitTransferTokens(event) {
        event.preventDefault();
        const numberOfTransferTokensDOMNode = ReactDOM.findDOMNode( this.refs.numberOfTokensToTransfer );
        const contactName =  this.state.contactSelected;
        const contactToTransfer = Contacts.findOne({ text: contactName });
        /*contactToTransfer.map( (contact) => (
            < Contact key={ contact._id } contact={ contact } />
        ));
        */

        console.log("contact id: " + contactToTransfer._id);
        const numberOfTokensToTranfer = parseInt( numberOfTransferTokensDOMNode.value.trim() );
        console.log("new tokens: " + numberOfTokensToTranfer);
        Contacts.update( contactToTransfer._id, {
            $inc: { value:  numberOfTokensToTranfer}
        });
        var user = Contacts.findOne({text: Meteor.user().username});
        Contacts.update( user._id, {
            $inc: { value: -numberOfTokensToTranfer}
        });
        numberOfTransferTokensDOMNode.value = '';

        const text = user.text + " sent " + contactToTransfer.text + " " + numberOfTokensToTranfer + " tokens";
        const dateTransaction = Date();
        Transactions.insert({
            text,
            date: dateTransaction,//current time
            transType: "Contact Transaction",
        });
    }



    renderTransferTokens() {
        function getName(item, index){
            return item.text;
        }

        let contacts = this.props.contacts;

        const userName = Meteor.user().username;
        let namesFiltered = contacts.filter((contact)=>{
           return  (contact.text.localeCompare(userName) !== 0)
        });


        let contactsNamesFiltered = namesFiltered.map((item)=>item.text);
        contactsNamesFiltered.unshift("");

        /*
        for( let i = 0; i < contacts.length; i++ ) {
            if ( contacts[ i ].text.localeCompare(Meteor.user().username) !== 0 ) {
                contactsNamesFiltered.push( contacts[ i ].text  );
            } else {
                contactsNamesFiltered.push("");
            }
        }
        */
        /*React components have a special field called -state-
         where you can store encapsulated component data.*/
        return (
            <div>
            <header>
                <h1>
                    Transfer Tokens
                </h1>
                <form className="transfer-tokens" onSubmit={ this.handleSubmitTransferTokens.bind( this ) }>
                    <span>Select Contact </span>
                    <Dropdown
                        value={ this.state.contactSelected }
                        onChange={ this.handleChangeContactSelected.bind( this ) }
                        options={ contactsNamesFiltered }
                    >
                    </Dropdown>
                    <span>&emsp;</span>{/*<span>{ this.state.contactSelected }</span>*/}
                    <input
                        type="number"
                        ref="numberOfTokensToTransfer"
                        placeholder="Type to transfer tokens"
                        min="0"
                    />
                    <input type="submit" value="Submit"/>
                </form>
            </header>
            </div>
        );
    }

    renderTransactionLog() {
        let count = 0;
        const numMess =  this.state.numberMessages;
        function checkMessageCount() {
            count++;
            return count <= numMess;
        }
        return(
                this.props.transactions.filter(checkMessageCount).map( ( transaction ) => (
                    < Transaction key={ transaction._id } transaction={ transaction } />
                ))
        );
    }
    renderBitcoinTicker(){
        let count = 0;
        const numMess =  1;
        function checkTickCount() {
            count++;
            return count <= numMess;
        }
        playSound(); // Play first time
        return(
                this.props.tickers.filter(checkTickCount).map( ( ticker ) => (
                        < BitCoinTicker key={ticker._id} ticker={ ticker } />
                ))
        );
    }

    render() {
        /* Adding assets with a form.
        The form element has an onSubmit attribute that references a method on
        the component called handleSubmit. In React, this is how you listen
        to browser events, like the submit event on the form.
        The input element has a ref property which will let us easily
        access this element later. */

        /* Griddle: The column meta data property is used to specify column properties that
           are not part of the result data object. For instance, if you want to
           specify a displayName that is different than the property name in the
           result data, the -columnMetadata- property is where this would be defined.*/
        const tokenAssetListMetadata = [{
            "columnName": "text",
            "displayName": "Asset Class"
            }, {
            "columnName": "value",
            "displayName": "Total Value £"
        }];
        return (
            <div className="container">
                <header>
                    { this.props.currentUser ? <h3>Welcome <AccountsUIWrapper /></h3>: <AccountsUIWrapper />}
                </header>

                <header>
                    <div>
                        < Deposit />
                    </div>
                </header>
                <header>
                    < div >
                        <h1>Token Asset-Composition List</h1>
                        { this.renderBitcoinTicker() }
                    </div>
                </header>
                    <ul>
                        <Griddle
                            results={ this.props.assets }
                            columnMetadata={ tokenAssetListMetadata }
                            columns={ [ "text", "value" ] } />
                        {/* {this.renderAssets()} */}
                    </ul>
                { this.props.currentUser ?
                    <div>
                        <header>
                            <h1>Contact List</h1>
                            < label className="hide-contact">
                                <input
                                    type="checkbox"
                                    readOnly
                                    checked={ this.state.hideContact }
                                    onChange={ this.toggleHideContact.bind( this )}
                                />
                                Hide Contact(s)
                            </label>
                            <form className="new-contact" onSubmit={ this.handleSubmit.bind( this ) }>
                                <input
                                    type="text"
                                    ref="nameTextInput"
                                    placeholder="Type to add new contact"
                                />
                                <input
                                    type="number"
                                    ref="numberOfTokensInput"
                                    placeholder="Type to gift tokens"
                                    min="0"
                                />
                                <input type="submit" value="Submit"/>
                            </form>
                        </header>
                        <ul>
                            { this.renderContacts() }
                            { this.renderTransferTokens() }
                            <div>
                                <header>
                                    <h1>Message Op-Log</h1>
                                    <form className="messages" onSubmit={ this.handleSubmitNumberMessages.bind( this )}>
                                        <input
                                            type="number"
                                            ref="numberOfMessages"
                                            placeholder="Type number of messages to display"
                                            min="5"
                                        />
                                        <input type="submit" value="Submit"/>
                                    </form>
                                </header>
                            </div>
                            <div className="scroll">
                                { this.renderTransactionLog() }
                            </div>
                        </ul>
                    </div>
                    : ''
                }
            </div>
        );
    }
}

App.propTypes = {
    assets: PropTypes.array.isRequired,
    contacts: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
    deposits: PropTypes.array.isRequired,
    transactions: PropTypes.array.isRequired,
    tickers: PropTypes.array.isRequired
};

// To use react-meteor-data, we need to wrap our component in a container using the
// createContainer Higher Order Component:
export default createContainer( ()=> {
// The wrapped App component fetches assets and contacts from the Assets and Contacts collections and
// supplies them to the underlying -App- component it wraps as the assets and contacts props.
// It does this in a reactive way, so that when the contents of the database change, the App re-renders,
    return {
        assets: Assets.find({}).fetch(),
        /*  Just add a sort option to the find call inside the data container wrapping the App component */
        contacts: Contacts.find( {}, {sort: { createdAt: -1 }}).fetch(),
        deposits: Deposits.find({}).fetch(),
        transactions: Transactions.find( {}, {sort: { date: -1 }, limit: 100} ).fetch(),
        tickers: Tickers.find({}, {sort: { date: -1 }, limit: 1}).fetch(),
        currentUser: Meteor.user()
    };
}, App);

