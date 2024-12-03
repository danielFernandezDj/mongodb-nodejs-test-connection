// Require MongoDB language driver
const { MongoClient, ObjectId } = require("mongodb")
require('dotenv').config()

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

const dbname = 'bank'
const collection_name = 'account'

const accountsCollection = client.db(dbname).collection(collection_name)

// Connect to the database
async function connectToDatabase() {
   try {
      await client.connect()
      console.log(`Connected to the ${dbname} database 🌎 \nfull connection string ${uri}`)
   } catch (error) {
      console.error(`Error connecting to the database ${error}`)
   }
}

// Documents Schema
const sampleAccount = [
   {
      account_id: 'MDB012312341',
      account_holder: 'Ada Lovelace',
      account_type: 'checking',
      balance: 60218,
   },
   {
      account_id: 'MDB062656456456',
      account_holder: 'Lola',
      account_type: 'saving',
      balance: 32453,
   },
]

const documentToFind = { _id: new ObjectId('674e32241a2813dc82438de9') }

async function main() {
   try {
      await connectToDatabase()
      let result = await accountsCollection.findOne(documentToFind)
      console.log(`Inserted ${result.insertedCount} documents`)
      console.log(result)
   } catch (error) {
      console.error(`Error inserting documents: ${error}`)
   } 
}

main()