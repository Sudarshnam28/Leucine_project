import express from "express";
import cors from "cors";
import { AppDataSource } from "./src/ormconfig";
import authRoutes from "./src/routes/authRoutes";
 import softwareRoutes from "./src/routes/softwareRoutes";
 import requestRoutes from "./src/routes/requestRoutes";
import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata";



const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log("Connected to DB");
  app.use("/api/auth", authRoutes);
  app.use("/api/software", softwareRoutes);
  app.use("/api/requests", requestRoutes);

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
