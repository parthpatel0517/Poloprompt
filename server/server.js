require("dotenv").config();
const express = require("express");
const cors = require("cors");

const promptsRouter = require("./routes/prompts");
const automationRouter = require("./routes/automation");
const newsletterRouter = require("./routes/newsletter");
const contactRouter = require("./routes/contact");
const blogRouter = require("./routes/blog");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, service: "PoloPrompt API" });
});

app.use("/api/prompts", promptsRouter);
app.use("/api/automation-ideas", automationRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/contact", contactRouter);
app.use("/api/blog-posts", blogRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found." });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PoloPrompt API listening on http://localhost:${PORT}`);
});
