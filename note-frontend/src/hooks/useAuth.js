import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const useAuth = () => {
  return Cookies.get("auth_user");
};

export default useAuth;
