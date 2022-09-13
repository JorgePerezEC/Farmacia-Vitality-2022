import axios from "axios";

const base = axios.create({
  baseURL: "http://192.168.100.5:5000/api",
});

export async function obtenerProductos() {
  try {
    const response = await base.get("/products");
    return response.data;
  } catch (error) {
    alert(error.toString());
  }
}
