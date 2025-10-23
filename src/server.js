import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Schema: Perfume
const perfumeSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  image: String,
  category: String,
  size: String,
});
const Perfume = mongoose.model("Perfume", perfumeSchema);

// Schema: Contact Message
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const Message = mongoose.model("Message", messageSchema);

// Routes
app.get("/perfumes", async (req, res) => res.json(await Perfume.find()));
app.post("/perfumes", async (req, res) => res.json(await Perfume.create(req.body)));
app.delete("/perfumes/:id", async (req, res) => {
  await Perfume.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.get("/messages", async (req, res) => res.json(await Message.find()));
app.post("/messages", async (req, res) => res.json(await Message.create(req.body)));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
