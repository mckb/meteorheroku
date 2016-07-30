import { Mongo } from 'meteor/mongo';

export const Tickers = new Mongo.Collection( 'tickers' );