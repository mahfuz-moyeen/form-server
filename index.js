const express = require("express");
const cors = require("cors");
const sectorsCollection = require("./data/sectorsdata.json");
const userDataCollection = require("./data/userData.json");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function run() {
  try {
    // get sectors
    app.get("/sectors", async (req, res) => {
      res.send(sectorsCollection);
    });

    // get form
    app.get("/form", async (req, res) => {
      res.send(userDataCollection);
    });

    //update form
    app.patch("/form-update", async (req, res) => {
      const data = req.body;
      userDataCollection.name = data.name;
      userDataCollection.sector = data.sector;
      userDataCollection.terms = data.terms;
      res.send({ message: "Form updated successfully" });
    });

    //delete  form
    app.delete("/form-clear", async (req, res) => {
      userDataCollection.name = "";
      userDataCollection.sector = "";
      userDataCollection.terms = false;
      res.send({ message: "form clear successfully" });
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("form server on");
});

app.listen(port, () => {
  console.log("listening port :", port);
});
