const express = require("express");
const sequelize = require("./config/db");
const filesRoutes = require("./routes/files.routes");

const app = express();

app.use(express.json());
app.use("/api/v1/files", filesRoutes);

// start server only after DB connection
sequelize.sync().then(() => {
  console.log("Database connected");

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
