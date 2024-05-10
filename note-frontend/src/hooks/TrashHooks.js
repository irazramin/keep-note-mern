import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/urls";
import Cookie from "js-cookie";
export const GetTrashNote = () => {
  const [trashes, setTrashes] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/trash-note`, {
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookie.get('access_token')}`
        }
      })
      .then((res) => {
        setTrashes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { trashes, setTrashes };
};
