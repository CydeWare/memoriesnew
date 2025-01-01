import dotenv from "dotenv";
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import route from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const result = dotenv.config({ path: "C:\\Users\\Owner\\Creative Cloud Files\\JavaScript Project Memories\\server\\.env"});

if(result.error){
    throw result.error;
}
// const { DB_URL } = result.parsed; //result.parsed returns an object of every variables in the Environment variables file(.env).
const DB_URL = "mongodb://Edward:idonotknown@cluster1-shard-00-00.y7oif.mongodb.net:27017,cluster1-shard-00-01.y7oif.mongodb.net:27017,cluster1-shard-00-02.y7oif.mongodb.net:27017/Aero?ssl=true&replicaSet=atlas-109t75-shard-0&authSource=admin&retryWrites=true&w=majority";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({limit: "30mb", extended: true})); //We use limit since we will be sending images
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));

//"mongodb://Edward:idonotknown@cluster1-shard-00-00.y7oif.mongodb.net:27017,cluster1-shard-00-01.y7oif.mongodb.net:27017,cluster1-shard-00-02.y7oif.mongodb.net:27017/Aero?ssl=true&replicaSet=atlas-109t75-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(DB_URL, { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to DB");
        app.listen(PORT, () => {
            console.log("listening on port " + PORT);
        });
    })
    .catch((error) => {   console.log(error);    })
// mongoose.set("useFindAndModify", false);

app.use("/posts", route);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello Welcome to memories API")
})
app.use("*", (req, res) => {
    res.end(`<h1>Page not found 404</h1>`)
})

