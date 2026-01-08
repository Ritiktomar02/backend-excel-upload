const Record = require("../models/Record");
const parseExcel = require("../utils/excelParser");

exports.uploadFile = (req, res) => {
  res.status(201).json({
    message: "File uploaded successfully",
    filePath: `uploads/${req.file.filename}`
  });
};

exports.processExcel = async (req, res) => {

  const rows = parseExcel(req.file.path);

  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    try {
      const id = row.Id || row.ID || row.id;
      const name = row.Name || row.NAME || row.name;
      const age = Number(row.Age || row.AGE || row.age);
      const education = row.Education || row.EDUCATION || row.education;

      if (!id || !name || age <= 0 || !education) {
        skipped++;
        console.log("Invalid row skipped:", row);
        continue;
      }

      await Record.create({
        id,
        name: name.trim(),
        age,
        education: education.trim()
      });

      inserted++;
      console.log("Inserted row:", id);
    } catch (err) {
      skipped++;
      console.log("DB error, row skipped:", err.message);
    }
  }

  res.json({ inserted, skipped });
};

exports.getAllRecords = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const where = req.query.education
    ? { education: req.query.education }
    : {};

  const { count, rows } = await Record.findAndCountAll({
    where,
    limit,
    offset
  });

  res.json({
    page,
    limit,
    total: count,
    data: rows
  });
};
