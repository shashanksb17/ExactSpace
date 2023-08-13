// Global modules
const express= require("express")
const cors=require("cors")
require("dotenv").config()

// Local modules
const {connection}=require("./config/db")
const {JsonData}=require("./model/JsonData.model")

const app=express()

app.use(cors())
app.use(express.json())
// app.use(bodyParser.json());


// ROUTES
app.get("/",(req,res)=>{
    res.send("HOME PAGE OF EXACTSPACE ASSIGNMENT")
})

app.post('/submit', async (req, res) => {
    const jsonData = req.body.data;

    try {
        const parsedData = JSON.parse(jsonData);
        console.log(parsedData);
        
        // Save the JSON data to MongoDB
        await JsonData.create({ data: jsonData });

        res.json(parsedData);
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON format' });
    }
});

app.get('/latest', async (req, res) => {
    try {
        // Fetch the latest JSON data from MongoDB
        const latestData = await JsonData.findOne().sort({ timestamp: -1 });

        if (latestData) {
            res.json(JSON.parse(latestData.data));
        } else {
            res.status(404).json({ message: 'No JSON data found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (err) {
        console.log("can not connect DB");
        console.log(err);
    }
    console.log(`server is running at port ${process.env.PORT}`);
});