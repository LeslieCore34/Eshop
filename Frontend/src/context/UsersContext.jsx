import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import ApiService from "../services/api.services";

const UsersContext = createContext();

function UsersContextProvider({ children, apiService }) {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const register = async (formData) => {
    try {
      setUser(
        await apiService.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
          formData
        )
      );
      alert(`Bienvenu ton inscription est validée`);
      return navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  const login = async (credentials) => {
    try {
      const data = await apiService.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login/`,
        credentials
      );
      localStorage.setItem("token", data.token);

      apiService.setToken(data.token);

      const result = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/me`
      );

      alert(`Coucou`);
      setUser(result.data.name);
      return navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    return null;
  };

  const context = useMemo(
    () => ({ user, login, register, apiService }),
    [user]
  );

  return (
    <UsersContext.Provider value={context}>{children}</UsersContext.Provider>
  );
}

UsersContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  apiService: PropTypes.instanceOf(ApiService).isRequired,
};

export { UsersContext, UsersContextProvider };
// eslint-disable-next-line react-refresh/only-export-components
export const useUsersContext = () => useContext(UsersContext);
