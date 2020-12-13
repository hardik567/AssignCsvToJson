const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

csvtojson()
  .fromFile("movies.csv")
  .then(csvData => {
    console.log(csvData);
    

    // let url = "mongodb://username:password@localhost:27017/";
    let url = "mongodb://localhost:27017/";
    
    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;
        client
          .db("zkoder_db")
          .collection("category")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;
            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
});