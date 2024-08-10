import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/urls";
import { userHeader } from "../utils/headers";

export const GetArchiveNotes = () => {
  const [archiveNotes, setArchiveNotes] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/archive-note`, {
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: userHeader(),
        },
      })
      .then((res) => {
        setArchiveNotes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { archiveNotes, setArchiveNotes };
};
