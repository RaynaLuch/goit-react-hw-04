import axios from "axios";

const ACCESS_KEY = "lAUWOsyllXr8g3KRo0pYnhbpn-dWi0OHuZYFtHY4VWY";
axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Autorization"] = ACCESS_KEY;

export const getImages = async (searchQuery, page) => {
  try {
    const response = await axios.get("/search/photos", {
      params: {
        query: searchQuery,
        client_id: ACCESS_KEY,
        page: page,
        per_page: 12,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log("error: " + error);
  }
};
