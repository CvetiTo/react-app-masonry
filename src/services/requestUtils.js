const request = async (method, url, data) => {
    try {

        const authString = localStorage.getItem('user');
        const user = JSON.parse(authString || '{}');
        let headers = {}
        if(user.accessToken){
            headers['X-Authorization'] = user.accessToken;
        }

        let bildReq;
        if(method === 'GET') {
            bildReq = fetch(url, { headers });
        } else {
            bildReq = fetch(url, {
                method,
                headers: {
                    ...headers,
                   "content-type": 'application/json' 
                },
                body: JSON.stringify(data)
            });
        }
       const response = await bildReq;

       console.log(response);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
    
};

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const put = request.bind({}, 'PUT');
export const patch = request.bind({}, 'PATCH');
export const del = request.bind({}, 'DELETE');