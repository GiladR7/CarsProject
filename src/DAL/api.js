const serverHost = "http://localhost:5000";

export async function getColorsOptions() {
  const data = await fetch(`${serverHost}/cars/colors`);
  const colors = await data.json();
  return colors;
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
  const respone = await fetch(`${serverHost}/ads?adID=${adID}&editData=true`);
  const {
    status,
    data: [
      {
        codeAreaID: codeArea,
        gearID: gear,
        colorID: color,
        carprice: price,
        modelyear: year,
        ...rest
      },
    ],
  } = await respone.json();
  return {
    codeArea,
    gear,
    color,
    price,
    year: year.split("T")[0],
    ...rest,
  };
}

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

export async function logInCheck(email, password) {
  const respone = await fetch(`${serverHost}/users/logIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await respone.json();
  if (data.status === "success") return Promise.resolve(data.data[0]);
  return Promise.reject(data.message);
}

export async function getAdByID(adID) {
  const respone = await fetch(`${serverHost}/ads?adID=${adID}`);
  const { status, data } = await respone.json();
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
  ] = data;
  const phone = `${codeArea}-${rest.phone}`;
  return {
    data: {
      id,
      manufacturer,
      gear,
      model,
      color,
      year,
      price,
      ...rest,
      phone,
    },
    status,
  };
}

export async function sendNewUser(userData) {
  const respone = await fetch(`${serverHost}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...userData,
    }),
  });

  const data = await respone.json();
  return data;
}

export async function updateUserDeatils(userID, inputsValues) {
  const respone = await fetch(`${serverHost}/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ userID }, { ...inputsValues }]),
  });

  return respone.json();
}

export async function sendNewAD(userID, part1, part2) {
  const respone = await fetch(`${serverHost}/ads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID, part1, part2 }),
  });

  return respone.json();
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

export async function addNewFavoritesAd(adID, userID) {
  const respone = await fetch(`${serverHost}/ads/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      adID,
      userID,
    }),
  });
  const data = await respone.json();

  return data.map(({ adID }) => {
    return adID;
  });
}

export async function removeAdFromFavorites(adID, userID) {
  const respone = await fetch(`${serverHost}/ads/favorites`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      adID,
      userID,
    }),
  });

  const data = await respone.json();

  return data.map(({ adID }) => {
    return adID;
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
