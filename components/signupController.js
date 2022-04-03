const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://ahmednaeem5575:9026040An!@cluster0.47nh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);

exports.signup = async (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        let dbo = db.db("myFirstDatabase");
        let user = req.body;
        let result = await dbo.collection("users").findOne({username:user.username})
        if(result){
            // user already exists
            res.send("failed")
        }else{
            // user does not exist
            let ack = await dbo.collection("users").insertOne(user)
            if(ack.acknowledged){
                // if inserted successfully
                res.send("success")
            }else{
                // if failed to insert in the database
                res.send("failed")
            }
        }
    });
}