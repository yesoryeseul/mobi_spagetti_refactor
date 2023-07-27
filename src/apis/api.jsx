import axiosInstance from "./@core";

export const FetchApi = {
  fetchData: async ({ url, params }) =>
    await axiosInstance.get(`/${url}`, { params }),
};
