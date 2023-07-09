export async function getApiCall(url) {
    try {
      const requestType = {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.ecomtoken ,
          "Cache-Control" : "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      };
  
      const response = await fetch(url, requestType);
      const responseJson = await response.json();
      return await responseJson;
    } catch (error) {
      return false;
    }
  }
  

  export async function postApiCall(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : localStorage.ecomtoken ,
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        return false;
    }
}

