import React, { Component, PropTypes } from 'react';

import { Contacts } from '../api/contacts.js';
import { Transactions } from '../api/transactions.js';

// Contact component - represents a single contact
export default class Contact extends Component {

    toggleChecked() {
        /* we call -Contacts.update- to check off a task.
         * The update function on a collection takes two arguments.
         * The first is a selector that identifies a subset of the collection,and
         * the second is an update parameter that specifies what should be done
         * to the matched objects. In this case, the selector is just the
         * _id of the relevant contact. The update parameter uses $set to toggle the
         * checked field, which will represent whether the contact has been completed. */
        Contacts.update( this.props.contact._id, {
            /* set the checked property to the opposite of its current value */
            $set: { checked: !this.props.contact.checked }
        });
    }

    deleteThisContact() {
        const text = this.props.contact.text;
        const dateRemoved = Date();
        Transactions.insert({
            text,
            date: dateRemoved,//current time
            transType: "Contact Removed",
        });
        Contacts.remove( this.props.contact._id );
    }

    render() {
        /*  Give contacts a different className when they are checked off,
            so that we can style them nicely in CSS */
        const contactClassName = this.props.contact.checked ? 'checked' : '';

        return (
            <li className = { contactClassName } >

                <input
                    type="checkbox"
                    readOnly
                    checked={ this.props.contact.checked }
                    onChange={ this.toggleChecked.bind(this) }

                />

                <span className="text"> { this.props.contact.text } </span>
                <span className="value"> { this.props.contact.value } </span>
                <button className="delete" onClick={ this.deleteThisContact.bind(this) }>
                    &times;
                </button>

            </li>
        );
    }
}

Contact.propTypes = {
    // This component gets the contact to display through a React prop.
    // We can use propTypes to indicate it is required
    contact: PropTypes.object.isRequired,
};