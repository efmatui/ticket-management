import { MongoClient } from "mongodb";

const client = new MongoClient('mongodb://root:password@127.0.0.1:27017')

export default client
