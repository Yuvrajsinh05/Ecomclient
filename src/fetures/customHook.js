import { useEffect } from "react";
import { logout } from "../routes/login/loginSlice";
import { useDispatch } from "react-redux";

export function useGetApiCall(url) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const requestType = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.ecomtoken,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        };

        const response = await fetch(url, requestType);
        const responseJson = await response.json();
        if (responseJson.error) {
          alert(responseJson.error + "Or Token Expired Please Login Again")
          dispatch(logout());
          return;
        }else{
          return await responseJson;
        }

        // Handle successful response
      } catch (error) {
        // Handle error
        return false;
      }
    }

    fetchData();
  }, [dispatch, url]);

  // You may return any data if needed
}

// Usage:
// UseApiCall(url);
