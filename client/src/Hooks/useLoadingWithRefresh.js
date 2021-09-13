import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../Store/Slices/authSlice";

const useLoadingWithRefresh = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/refresh`,
          {
            withCredentials: true,
          }
        );
        dispatch(setUser(data));
        dispatch(setAuth(true));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [dispatch]);

  return { loading };
};

export default useLoadingWithRefresh;
