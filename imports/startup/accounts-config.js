import { Accounts } from 'meteor/accounts-base';

// configure the accounts UI to use username instead of email address
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});