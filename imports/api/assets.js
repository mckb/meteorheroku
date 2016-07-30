// Storing tasks in a collection

// Collections are Meteor's way of storing persistent data.

// The special thing about collections in Meteor is that they can be accessed from
// both the server and the client, making it easy to write view logic without having
// to write a lot of server code. They also update themselves automatically, so a
// view component backed by a collection will automatically display the most up-to-date
// data.

// Creating a new collection is as easy as calling
// MyCollection = new Mongo.Collection("my-collection"); in your JavaScript.

// On the server, this sets up a MongoDB collection called my-collection;

// on the client, this creates a cache connected to the server collection.

// You can read more about collections in the Collections article of the Meteor Guide.

// To create the collection, we define a new assets module that creates a
// Mongo collection and exports

//We need to import that module on the server (this creates the MongoDB collection
// and sets up the plumbing to get the data to the client):

import { Mongo } from 'meteor/mongo';

export const Assets = new Mongo.Collection( 'assets' );