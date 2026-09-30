import express from "express";
import authRoutes from "./auth.routes";
import addressRoutes from "./Route/Address.route";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/addresses", addressRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));