const users = [
  {
    userID: 1,
    user: "GiladR",
    email: "giladr777@gmail.com",
    password: "123456Gad",
    chooseCategory: [1, 3],
  },
  {
    userID: 2,
    user: "Yoni",
    email: "yoni@gmail.com",
    password: "12345Yad",
    chooseCategory: [4],
  },
];

let faivoriteAdsByUser = [
  { userID: 2, adID: 1 },
  { userID: 2, adID: 3 },
  { userID: 1, adID: 2 },
];

const colors = [
  { colorID: 1, colorName: "אדום" },
  { colorID: 2, colorName: "אפור" },
  { colorID: 3, colorName: "ורוד" },
  { colorID: 4, colorName: "חום" },
  { colorID: 5, colorName: "ירוק" },
  { colorID: 6, colorName: "כחול" },
  { colorID: 7, colorName: "כתום" },
  { colorID: 8, colorName: "לבן" },
  { colorID: 9, colorName: "סגול" },
  { colorID: 10, colorName: "צהוב" },
  { colorID: 11, colorName: "שחור" },
];

export async function getColorsOptions() {
  return Promise.resolve(colors);
}
async function getUsers() {
  return users;
}
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
export async function getAdEditData() {
  return [
    {
      userID: 1,
      id: 1,
      categoryID: 1,
      manufacturer: "יונדאי",
      model: "טוסון",
      year: "2020-02-12",
      owners: 2,
      gear: 1,
      km: 1200,
      city: "נשר",
      color: 1,
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
      userID: 2,
      id: 2,
      categoryID: 4,
      manufacturer: "סוזוקי",
      model: "גימיני",
      year: "2020-02-12",
      city: "נתניה",
      owners: 3,
      gear: 2,
      km: 120000,
      color: 2,
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
      userID: 1,
      id: 3,
      categoryID: 3,
      manufacturer: "פיג'ו",
      model: "GMAX 250",
      year: "2020-02-12",
      city: "קרית שמונה",
      owners: 3,
      km: 12000,
      color: 3,
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

export async function getAds() {
  return [
    {
      userID: 1,
      id: 1,
      manufacturer: "יונדאי",
      model: "טוסון",
      year: "2020-02-12",
      owners: 2,
      gear: "אוטומטי",
      km: "1,200",
      city: "נשר",
      color: "לבן",
      price: "120,000",
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
      userID: 2,
      id: 2,
      manufacturer: "סוזוקי",
      model: "גימיני",
      year: "2020-02-12",
      city: "נתניה",
      owners: 3,
      gear: "אוטומטי",
      km: "120,000",
      color: "שחור",
      price: "65,000",
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
      userID: 1,
      id: 3,
      manufacturer: "פיג'ו",
      model: "GMAX 250",
      year: "2012-02-12",
      city: "קרית שמונה",
      owners: 3,
      km: "12,000",
      color: "לבן",
      price: "12,000",
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
      { manufacturerID: 5, manufacturerName: "סוזוקי" },
      { manufacturerID: 6, manufacturerName: "Jeep" },
    ],
  };

  return manufacturerByCategories[categoryID];
}

export async function getModels(categoryID, manufacturerID) {
  const modelsObj = {
    1: [
      {
        manufacturerID: 1,
        manufacturerName: "יונדאי",
        modelID: 1,
        modelName: "i10",
      },
      {
        manufacturerID: 2,
        manufacturerName: "פולסווגן",
        modelID: 2,
        modelName: "פולו",
      },
    ],
    3: [
      {
        manufacturerID: 3,
        manufacturerName: "פיגו",
        modelID: 3,
        modelName: "GMAX 125",
      },
      {
        manufacturerID: 4,
        manufacturerName: "במוו",
        modelID: 4,
        modelName: "דגם במוו",
      },
    ],
    4: [
      {
        manufacturerID: 5,
        manufacturerName: "סוזוקי",
        modelID: 5,
        modelName: "גימיני",
      },
      {
        manufacturerID: 6,
        manufacturerName: "Jeep",
        modelID: 6,
        modelName: "רנגלר",
      },
    ],
  };

  return modelsObj[categoryID].filter(({ manufacturerID: dataID }) => {
    return +dataID === +manufacturerID;
  });
}

export async function getGears() {
  return [
    { gearID: 1, gearName: "ידני" },
    { gearID: 2, gearName: "אוטומטי" },
  ];
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

export function logInCheck(email, password) {
  return new Promise((resolve, reject) => {
    getUsers().then((users) => {
      const validaUser = users.find(
        ({ email: emailDataB, password: passwordDataB }) => {
          return email === emailDataB && password === passwordDataB;
        }
      );

      if (validaUser) resolve(validaUser);
      else reject("שם השמתמש או הסיסמא אינם נוכנים");
    });
  });
}

export function getAdByID(adID) {
  return getAdEditData().then((ads) => {
    const adData = ads.find((ad) => {
      return +ad.id === +adID;
    });

    return Promise.resolve(adData);
  });
}

function getAdsByID(adsIDs) {
  return getAdEditData().then((ads) => {
    const adsData = ads.filter((ad) => {
      return adsIDs.includes(ad.id);
    });

    return Promise.resolve(adsData);
  });
}

export function sendNewUser(userData) {
  console.log(userData);
}

export function sendNewAD(adData) {
  console.log(adData);
}

export async function getMyAds(userID) {
  const allAds = await getAds();
  const myAds = allAds.filter(({ userID: currentAdID }) => {
    return currentAdID === userID;
  });

  return myAds;
}

export async function getMyFaivoritesAds(userID) {
  const likeAdsIDs = await getIDsOfFaivoritesAds(userID);
  const favoritesAds = await getAdsByID(likeAdsIDs);
  return favoritesAds;
}

export async function getIDsOfFaivoritesAds(userID) {
  const likeAdsIDs = await Promise.resolve(
    faivoriteAdsByUser
      .filter((ad) => {
        return userID === ad.userID;
      })
      .map((ad) => {
        return ad.adID;
      })
  );

  return likeAdsIDs;
}

export async function updateFaivoriesAds(userID, adID) {
  const containsAD = faivoriteAdsByUser.find((adsFaivories) => {
    return adsFaivories.userID === userID && adsFaivories.adID === adID;
  });
  if (containsAD) {
    faivoriteAdsByUser = faivoriteAdsByUser.filter((adsFaivories) => {
      return !(adsFaivories.userID === userID && adsFaivories.adID === adID);
    });
  } else {
    faivoriteAdsByUser.push({ userID, adID });
  }
}
