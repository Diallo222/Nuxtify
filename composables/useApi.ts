export const useApi = async (url: string, options = {}) => {
  const authToken = useCookie("authToken").value;

  return await $fetch(url, {
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Accept: "application/json",
      Authorization: `${authToken} ? Bearer ${authToken} : undefined`,
      "Content-Type": "application/json",
    },
    ...options,
  });
};
