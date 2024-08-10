const useAuth = () => {
  return JSON.parse(localStorage.getItem("auth_user"));
};

export default useAuth;
