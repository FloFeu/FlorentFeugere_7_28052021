import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default {
  signup() {
    return apiClient.post("/auth/signup", {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
  },
  getPostDetails() {
    return apiClient.get("/posts/:id");
  },
};
