export const API_URL = "https://quizadmin.neofantasy.io/api";

// export function hideMyModal(modalId) {
//   $(`${modalId}`).hide();
//   $("body").removeAttr("class");
//   $("body").removeAttr("style");
//   $(".modal-backdrop").remove();
// }

// export function openMyModal(modalId) {
//   $(`${modalId}`).open();
// }

var token;

export function setToken(tokenString) {
  token = tokenString;
  localStorage.setItem("token", JSON.stringify(token));
}

export function getToken() {
  if (!token) {
    token = JSON.parse(localStorage.getItem("token"));
  }

  return token;
}

export function removeToken() {
  token = "";
  localStorage.removeItem("token");
}

export const fetchJsonData = async (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
};

// var nftData;

// export const setNftData = async (data) => {
//   nftData = JSON.stringify(data);
//   localStorage.setItem("nft_data", JSON.stringify(data));
// };

// export const getNftData = async () => {
//   if (!nftData) {
//     nftData = JSON.parse(localStorage.getItem("nft_data"));
//     // nftData = JSON.parse(nftData);
//   }

//   return nftData;
// };
