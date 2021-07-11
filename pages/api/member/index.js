import db from "../../../app/db";

export default async (req, res) => {
  try {
    await db.collection("members").add({
      created_at: new Date(),
      last_name: req.body["last_name"],
      balance: 1370,
    });
    res.status(201).json({ detail: "Successfully created" });
  } catch (e) {
    res.status(400).end();
  }
};
