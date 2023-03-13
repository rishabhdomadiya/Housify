import axios from "axios";
export default axios.create({
  baseURL: "https://group12-backend.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
