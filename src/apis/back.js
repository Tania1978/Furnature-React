import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  contentType: "application/json",
  dataType: "json",
});
