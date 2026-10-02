import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from './routes/auth.routes.js'
import userRoutes from "./routes/user.routes.js";
import caseRoutes from "./routes/case.routes.js";
import hearingRoutes from "./routes/hearing.routes.js";
import documentRoutes from "./routes/document.routes.js";
import reportRoutes from "./routes/report.routes.js";


import connectDB from "./config/db.js";
import createDefaultAdmin from "./utils/createDefaultAdmin.js";

dotenv.config();

const app = express();

// Middlewares

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());




app.use('/api/v1/auth',authRoutes)
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cases", caseRoutes);
app.use("/api/v1/hearings", hearingRoutes);
app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/reports", reportRoutes);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await createDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();