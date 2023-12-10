import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import { startSequelize } from "./utils/startSequelize.js";

import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import productRoutes from "./routes/productRoutes.js";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/products", productRoutes);


app.use((err, request, response, next) => {
    if (response.headersSent) return next(err);
    response.status(500).json({
      message: httpResponseMessage[response.statusCode],
    });
  
    console.log(err);
  });

  startSequelize();

app.listen(port, () => {
    console.log(`Server is Running at port http://localhost:${port}`);
});