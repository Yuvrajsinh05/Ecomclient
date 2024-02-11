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
  
  export async function getApiCallWithBody(url, body = null) {
    try {
      const requestType = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.ecomtoken,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      };
  
      // Include the body in the request if provided
      if (body) {
        requestType.body = JSON.stringify(body);
      }
  
      const response = await fetch(url, requestType);
      const responseJson = await response.json();
      return responseJson;
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
                "customer" : localStorage.getItem('ecomuserId')
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        return false;
    }
}

