export const categorys = {
  "רכב פרטי": [
    {
      manufactuer: "ינודאי",
      model: "i10",
    },
    {
      manufactuer: "פולסווגן",
      model: "פולו",
    },
    {
      manufactuer: "ינודאי",
      model: "i20",
    },
  ],
  גיפ: [
    {
      manufactuer: "סוזוקי",
      model: "גימיני",
    },
    {
      manufactuer: "Jeep",
      model: "רנגלר קצר",
    },
    {
      manufactuer: "Jeep",
      model: "רנגלר ארוך",
    },
  ],

  אופנוע: [
    {
      manufactuer: "הונדה",
      model: "CB125R",
    },
    {
      manufactuer: "ב.מ.וו",
      model: "F650",
    },
    {
      manufactuer: "ב.מ.וו",
      model: "F800GS",
    },
  ],
};

fetch(
  "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1271"
)
  .then((res) => res.json())
  .then((data) =>
    console.log(
      data.result.records
        .filter((obj) => {
          return !(
            obj["שם_ישוב"].includes("(") || obj["שם_ישוב"].includes(")")
          );
        })
        .map((data) => data["שם_ישוב"])
    )
  );
