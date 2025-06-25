// src/authProvider.ts

const authProvider = {
  login: async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Login inválido");

    const { data } = await response.json();

    localStorage.setItem("token", data.jwt_token );
    return Promise.resolve();
  },

  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },

  checkError: ({ error }: { error: { status: number } }) => {
    if (error?.status === 401 || error?.status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(), // Personalize se tiver permissões
};

export default authProvider;
