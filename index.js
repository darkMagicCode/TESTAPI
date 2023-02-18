const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const config = require("./config");

const app = express();
app.use(cors());

app.get("/data", async (req, res) => {
  try {
    // retrieve the ID and branch ID values from the frontend
    const companyCode = req.query.companyCode;
    const branchCode = req.query.branchCode;
    const entryId = req.query.entryId;
    const yearId = req.query.yearId;
    const entryType = req.query.entryType;
    // connect to the database
    const pool = await sql.connect(config.dbConfig);

    // create a new request object
    const request = new sql.Request(pool);

    // execute the query
    const result = await request.query(`
    SELECT *
    FROM EnteriesD D
    WHERE D.CompanyCode = ${companyCode}
      AND D.BranchCode = ${branchCode}
      AND D.EnteryId = ${entryId}
      AND D.YearId = ${yearId}
      AND D.EnteryType = '${entryType}'`);

    // send the result as a response
    console.log(result.recordsets);
    res.send(result.recordsets);
  } catch (error) {
    // handle the error
    console.error(error);
    res.status(500).send({
      message: "An error occurred while retrieving data from the database.",
    });
  }
});


//==========
app.get("/getalldaily", async (req, res) => {
  try {
    // retrieve the ID and branch ID values from the frontend
    const companyCode = req.query.companyCode;
    const branchCode = req.query.branchCode;
  
    // connect to the database
    const pool = await sql.connect(config.dbConfig);

    // create a new request object
    const request = new sql.Request(pool);

    // execute the query
    const result = await request.query(`SELECT * FROM EnteriesH WHERE companyCode=${companyCode}and BranchCode=${branchCode}`);

    // send the result as a response
    console.log(result.recordsets);
    res.send(result.recordsets);
  } catch (error) {
    // handle the error
    console.error(error);
    res.status(500).send({
      message: "An error occurred while retrieving data from the database.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
