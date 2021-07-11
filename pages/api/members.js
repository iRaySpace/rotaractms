import db from "../../app/db";

export default async (req, res) => {
  try {
    const snapshot = await db.collection("members").orderBy("created_at").get();
    res.status(200).json({
      results: _getData(snapshot),
    });
  } catch (e) {
    res.status(400).end();
  }
};

function _getData(snapshot) {
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      created_at: data["created_at"].toDate(),
    };
  });
}
