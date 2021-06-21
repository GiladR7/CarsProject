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

export async function getCities(serach, inputsValues, setInputsValues) {
  const cities = await fetchCities();
  const filterCities = cities.filter((city) => {
    return serach && city.startsWith(serach);
  });
  let isValid = true;

  inputsValues.city.cities = filterCities.slice(0, 5);
  if (filterCities.length === 0) {
    isValid = false;
  }

  inputsValues.city.isValid = isValid;
  setInputsValues({ ...inputsValues });
}

export async function getAds() {
  return [
    {
      id: 1,
      manufacturer: "יונדאי",
      model: "טוסון",
      year: 2020,
      owners: 2,
      gear: "אוטומטי",
      km: 1200,
      city: "נשר",
      color: "לבן",
      price: 120000,
      phone: "050-2737204",
      images: [
        "https://www.galileasing.co.il/wp-content/uploads/2018/05/TUCSON.jpg",
        "http://www.carcost.co.il/Images/VehicleSubModelOptimizedImages/3062-7865.jpg",
        "https://www.kvishim.co.il/wp-content/uploads/images-007/Tucson-2016.jpg",
        "https://big-lease.co.il/wp-content/uploads/2019/10/Hyundai-Tucson-6.jpg",
      ],
      description: `רכב חדש אחריות עד 30/7/22 בניסאן מצלמה אחורית מולטימדיה חימום
      מושבים שלט חכם בגז' ענק .נסע רק לעבודה ובית שמורה 24,000 ק"מ
      נסיעות רחוקות נוסע 5.0 ל100 km שותה 1 ל 20 -18 בעיר 1 ל 13-15
      שווה כל שקל !!!!!!רק לרציניים בלבד`,
      postDate: "02.12.2018",
    },
    {
      id: 2,
      manufacturer: "סוזוקי",
      model: "גימיני",
      year: 2015,
      city: "נתניה",
      owners: 3,
      gear: "אוטומטי",
      km: 120000,
      color: "שחור",
      price: 65000,
      phone: "050-2737204",
      images: [
        "https://img.favcars.com/suzuki/jimny/suzuki_jimny_2007_wallpapers_1_b.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3mK3ZmCS9ulOhEMPj-U1RRrvndTIT83Xjm7ckZ_1a4ljdpXEdgsFFfXiAdXuWBPc2z5o&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjgv3jdu457TTjJ9Q30YkSrNyWCHK558i8Ap6mbfmVQ_baRzslbnyqirIn6qQ7ndv-rA&usqp=CAU",
      ],
      description: `רכב חדש אחריות עד 30/7/22 בניסאן מצלמה אחורית מולטימדיה חימום
      מושבים שלט חכם בגז' ענק .נסע רק לעבודה ובית שמורה 24,000 ק"מ
      נסיעות רחוקות נוסע 5.0 ל100 km שותה 1 ל 20 -18 בעיר 1 ל 13-15
      שווה כל שקל !!!!!!רק לרציניים בלבד`,
      postDate: "09.06.2020",
    },
    {
      id: 3,
      manufacturer: "פיג'ו",
      model: "GMAX 250",
      year: 2012,
      city: "קרית שמונה",
      owners: 3,
      km: 12000,
      color: "לבן",
      price: 12000,
      phone: "050-3434231",
      images: [
        "http://1.bp.blogspot.com/-MUNRWFJiAwU/UxNoIlUgd7I/AAAAAAAAAJk/6WD_yYHiNys/s1600/IMG_0307.JPG",
      ],
      description: `רכב חדש אחריות עד 30/7/22 בניסאן מצלמה אחורית מולטימדיה חימום
      מושבים שלט חכם בגז' ענק .נסע רק לעבודה ובית שמורה 24,000 ק"מ
      נסיעות רחוקות נוסע 5.0 ל100 km שותה 1 ל 20 -18 בעיר 1 ל 13-15
      שווה כל שקל !!!!!!רק לרציניים בלבד`,
      postDate: "09.06.2020",
    },
  ];
}

export async function getCategories() {
  return [
    {
      categoryID: 1,
      categoryName: "רכב פרטי",
    },
    {
      categoryID: 3,
      categoryName: "אופנוע",
    },
    {
      categoryID: 4,
      categoryName: "ג'יפ",
    },
  ];
}

export async function getManufacturer(categoryID) {
  const manufacturerByCategories = {
    1: [
      { manufacturerID: 1, manufacturerName: "יונדאי" },
      { manufacturerID: 2, manufacturerName: "פולסווגן" },
    ],
    3: [
      { manufacturerID: 3, manufacturerName: "פיגו" },
      { manufacturerID: 4, manufacturerName: "במוו" },
    ],
    4: [
      { manufacturerID: 5, manufacturerName: "גימיני" },
      { manufacturerID: 6, manufacturerName: "רנגלר" },
    ],
  };

  return manufacturerByCategories[categoryID];
}

function fetchCities() {
  return fetch(
    "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1271"
  )
    .then((resopne) => resopne.json())
    .then((result) =>
      result.result.records
        .filter((obj) => {
          return !(
            obj["שם_ישוב"].includes("(") || obj["שם_ישוב"].includes(")")
          );
        })
        .map((data) => data["שם_ישוב"])
    );
}
