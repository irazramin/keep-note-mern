import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

const useAuth = () => {
    const [authUser, setAuthUser] = useState()
    useEffect(() => {
        const userCookie = Cookies.get('auth_user');
        if (userCookie) {
          const user = JSON.parse(userCookie);
          setAuthUser(user);
        }
      }, []);
    
      console.log(Cookies.get('auth_user'))
      return authUser;
}

export default useAuth
