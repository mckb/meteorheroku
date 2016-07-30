import { Meteor } from 'meteor/meteor';

//  Load assets mongoDB collection on the server
import '../imports/api/assets.js';
import '../imports/api/contacts.js';
import '../imports/api/transactions.js';
import '../imports/api/tickers.js';
import '../imports/api/deposits.js';

Meteor.startup(() => {

  // code to run on server at startup
});

/*
const userObj = { userId: { $exists : false } };
const fieldsObj = { fields: Lists.publicFields };

Meteor.publish( 'lists.public', function() {
    return Lists.find( userObj, fieldsObj) }
);*/
