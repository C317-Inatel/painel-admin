// src/dataProvider.ts
import { DataProvider } from "react-admin";

const API_URL = import.meta.env.VITE_API_URL;

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const token = localStorage.getItem("token");

    const page = params.pagination.page;
    const perPage = params.pagination.perPage;

    const url = new URL(`${API_URL}/${resource}`);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", perPage.toString());

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao buscar dados");

    const json = await response.json();

    return {
      data: json.data,
      total: json.pagination.total,
    };
  },

  getOne: async (resource, params) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Erro ao buscar item');

    const json = await response.json();

    return {
      data: json.data, 
    };
  },
  
  delete: async (resource, params) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Erro ao excluir');

  const json = await response.json();

  return { data: json.data || { id: params.id } }; 
},


  getMany: () => Promise.reject(),
  getManyReference: () => Promise.reject(),
  update: () => Promise.reject(),
  updateMany: () => Promise.reject(),
  create: () => Promise.reject(),
  deleteMany: () => Promise.reject(),
};

export default dataProvider;
