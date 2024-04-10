const accountLoader = async (apiService) => {
  try {
    const userData = await apiService.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/me`
    );
    return {
      preLoadUser: userData ?? null,
    };
  } catch (err) {
    console.error("erreur de récupération de compte", err);
    return null;
  }
};

export default accountLoader;
