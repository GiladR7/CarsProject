const serverHost = "http://localhost:5000";
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
  const data = await fetch(`${serverHost}/cars/colors`);
  const colors = await data.json();
  return colors;
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
export async function getAdEditData(adID) {
  // owners: {
  //   value: "",
  //   isValid: true,
  //   errors: [],
  // },
  // year: {
  //   value: "",
  //   isValid: true,
  //   errors: [],
  // },
  // km: {
  //   value: "",
  //   isValid: true,
  //   errors: [],
  // },
  // color: {
  //   value: "",
  //   isValid: true,
  //   errors: [],
  //   selectList: [],
  // },
  // gear: {
  //   value: "",
  //   isValid: true,
  //   errors: [],
  //   selectList: [],
  // },
  // codeArea: {
  //   value: "",
  //   isValid: true,
  //   errors: [],
  // },
  // phone: {
  //   value: "",
  //   isValid: true,
  //   errors: [],
  // },
  // file: {
  //   value: "",
  //   isValid: true,
  //   errors: [],
  // },
  // city: {
  //   value: "",
  //   isValid: true,
  //   errors: [],
  //   cities: [],
  // },
  // description: {
  //   value: "",
  //   isValid: true,
  //   errors: [],
  // },
  const data = await fetch(`${serverHost}/ads?adID=${adID}&editData=true`);
  const [
    {
      codeAreaID: codeArea,
      gearID: gear,
      colorID: color,
      carprice: price,
      modelyear: year,
      ...rest
    },
  ] = await data.json();
  return {
    codeArea,
    gear,
    color,
    price,
    year: year.split("T")[0],
    ...rest,
  };
}

// export async function getAds() {
//   return [
//     {
//       userID: 1,
//       id: 1,
//       manufacturer: "יונדאי",
//       model: "טוסון",
//       year: "2020-02-12",
//       owners: 2,
//       gear: "אוטומטי",
//       km: "1,200",
//       city: "נשר",
//       color: "לבן",
//       price: "120,000",
//       phone: "050-2737204",
//       images: [
//         "https://www.galileasing.co.il/wp-content/uploads/2018/05/TUCSON.jpg",
//         "http://www.carcost.co.il/Images/VehicleSubModelOptimizedImages/3062-7865.jpg",
//         "https://www.kvishim.co.il/wp-content/uploads/images-007/Tucson-2016.jpg",
//         "https://big-lease.co.il/wp-content/uploads/2019/10/Hyundai-Tucson-6.jpg",
//       ],
//       description: `רכב חדש אחריות עד 30/7/22 בניסאן מצלמה אחורית מולטימדיה חימום
//       מושבים שלט חכם בגז' ענק .נסע רק לעבודה ובית שמורה 24,000 ק"מ
//       נסיעות רחוקות נוסע 5.0 ל100 km שותה 1 ל 20 -18 בעיר 1 ל 13-15
//       שווה כל שקל !!!!!!רק לרציניים בלבד`,
//       postDate: "02.12.2018",
//     },
//     {
//       userID: 2,
//       id: 2,
//       manufacturer: "סוזוקי",
//       model: "גימיני",
//       year: "2020-02-12",
//       city: "נתניה",
//       owners: 3,
//       gear: "אוטומטי",
//       km: "120,000",
//       color: "שחור",
//       price: "65,000",
//       phone: "050-2737204",
//       images: [
//         "https://img.favcars.com/suzuki/jimny/suzuki_jimny_2007_wallpapers_1_b.jpg",
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3mK3ZmCS9ulOhEMPj-U1RRrvndTIT83Xjm7ckZ_1a4ljdpXEdgsFFfXiAdXuWBPc2z5o&usqp=CAU",
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjgv3jdu457TTjJ9Q30YkSrNyWCHK558i8Ap6mbfmVQ_baRzslbnyqirIn6qQ7ndv-rA&usqp=CAU",
//       ],
//       description: `רכב חדש אחריות עד 30/7/22 בניסאן מצלמה אחורית מולטימדיה חימום
//       מושבים שלט חכם בגז' ענק .נסע רק לעבודה ובית שמורה 24,000 ק"מ
//       נסיעות רחוקות נוסע 5.0 ל100 km שותה 1 ל 20 -18 בעיר 1 ל 13-15
//       שווה כל שקל !!!!!!רק לרציניים בלבד`,
//       postDate: "09.06.2020",
//     },
//     {
//       userID: 1,
//       id: 3,
//       manufacturer: "פיג'ו",
//       model: "GMAX 250",
//       year: "2012-02-12",
//       city: "קרית שמונה",
//       owners: 3,
//       km: "12,000",
//       color: "לבן",
//       price: "12,000",
//       phone: "050-3434231",
//       images: [
//         "http://1.bp.blogspot.com/-MUNRWFJiAwU/UxNoIlUgd7I/AAAAAAAAAJk/6WD_yYHiNys/s1600/IMG_0307.JPG",
//       ],
//       description: `רכב חדש אחריות עד 30/7/22 בניסאן מצלמה אחורית מולטימדיה חימום
//       מושבים שלט חכם בגז' ענק .נסע רק לעבודה ובית שמורה 24,000 ק"מ
//       נסיעות רחוקות נוסע 5.0 ל100 km שותה 1 ל 20 -18 בעיר 1 ל 13-15
//       שווה כל שקל !!!!!!רק לרציניים בלבד`,
//       postDate: "09.06.2020",
//     },
//   ];
// }

export async function getAds(orderBy, desc, categories) {
  let categoriesQuery = "";
  categories.forEach((category, index, arr) => {
    if ((index === 0 && arr.length === 1) || index + 1 === arr.length) {
      categoriesQuery += `categoryID[]=${category}`;
    } else {
      categoriesQuery += `categoryID[]=${category}&`;
    }
  });
  const data = await fetch(
    `${serverHost}/ads?orderBy=${orderBy}&desc=${desc}${
      categoriesQuery ? `&${categoriesQuery}` : ""
    }`
  );
  const ads = await data.json();
  return ads;
}

export async function getCategories() {
  const data = await fetch(`${serverHost}/cars`);
  const categories = await data.json();
  return categories;
}

export async function getManufacturer(categoryID) {
  const data = await fetch(
    `${serverHost}/cars/manufacturers?categoryID=${categoryID}`
  );
  const manufacturers = await data.json();
  return manufacturers;
}

export async function getModels(categoryID, manufacturerID) {
  const data = await fetch(
    `${serverHost}/cars/models?categoryID=${categoryID}&manufacturerID=${manufacturerID}`
  );
  const models = await data.json();
  return models;
}

export async function getGears() {
  const data = await fetch(`${serverHost}/cars/gears`);
  const gears = await data.json();
  return gears;
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

// export function getAdByID(adID) {
//   return getAdEditData().then((ads) => {
//     const adData = ads.find((ad) => {
//       return +ad.id === +adID;
//     });

//     return Promise.resolve(adData);
//   });
// }

export async function getAdByID(adID) {
  const data = await fetch(`${serverHost}/ads?adID=${adID}`);
  const [
    {
      adid: id,
      manufacturername: manufacturer,
      gearname: gear,
      modelname: model,
      colorname: color,
      modelyear: year,
      codeArea,
      carprice: price,
      ...rest
    },
  ] = await data.json();
  const phone = `${codeArea}-${rest.phone}`;
  return {
    id,
    manufacturer,
    gear,
    model,
    color,
    year,
    price,
    ...rest,
    phone,
  };
}

function getAdsByID(adsIDs) {
  return getAds().then((ads) => {
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
  try {
    const data = await fetch(`${serverHost}/ads?userID=${userID}`);
    const myAds = await data.json();
    return myAds;
  } catch (err) {
    console.log(err);
  }
}

export async function getMyFaivoritesAds(userID) {
  const data = await fetch(`${serverHost}/ads/favorites?userID=${userID}`);
  const [adIDs, adData] = await data.json();

  return [
    adIDs.map(({ adID }) => {
      return adID;
    }),
    adData,
  ];
}

export async function getIDsOfFaivoritesAds(userID) {
  const data = await fetch(`${serverHost}/ads/favorites?userID=${userID}`);
  const likeAdsIDs = await data.json();

  return likeAdsIDs[0].map(({ adID }) => {
    return adID;
  });
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

  return getIDsOfFaivoritesAds(userID).then((idsOfFaivoritesAds) => {
    return idsOfFaivoritesAds;
  });
}

export async function getAreaCodes() {
  try {
    const data = await fetch(`${serverHost}/cars/codeArea`);
    const phoneAreaCodes = await data.json();
    return phoneAreaCodes;
  } catch (err) {
    return [];
  }
}
