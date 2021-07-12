import db from "../../app/db";

export default async (req, res) => {
  const { fields } = req.query;
  try {
    const snapshot = await db.collection("members").orderBy("created_at").get();
    res.status(200).json({
      results: _getData(snapshot, fields),
    });
  } catch (e) {
    res.status(400).end();
  }
};

function _getData(snapshot, fields) {
  const fieldsArr = fields ? fields.split(",") : null;
  return snapshot.docs.map((doc) => {
    const docData = doc.data();
    const data = {
      ...docData,
      id: doc.id,
      created_at: docData["created_at"].toDate(),
    };
    if (fieldsArr) {
      const fieldsData = Object.keys(data)
        .filter((key) => fieldsArr.includes(key))
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {});
      return fieldsData;
    }
    return data;
  });
}
