import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/urls";
export const GetTrashNote = () => {
  const [trashes, setTrashes] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/trash-note`, {
        withCredentials: true,
        credentials: "include",
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
