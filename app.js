import express from "express";
import indexRouter from "./src/api/components/indexRoute.js";
import db from "./src/api/connections/dbMaster.js";
import port from "./src/api/config/config.js";
import session from "express-session";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "cart",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use("/api/v1", indexRouter);

// error handler
app.use((err, req, res, next) => {
  console.log("Inside Error handling");
  res.status(err.status).send({
    error: {
      status: err.status || 500,
      msg: err.message || "Internal Server Error",
      data: err.stack,
    },
  });
});

app.listen(port.port, () =>
  console.log(`Example app listening on port ${port.port}!`)
);
