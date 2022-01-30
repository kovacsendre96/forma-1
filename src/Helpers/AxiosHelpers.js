export const apiOptions = (urlDetail,method,params) => {
    const url = `https://api-formula-1.p.rapidapi.com/${urlDetail}`;
    const options = {
        method: method,
        url: url,
        params: params,
        headers: {
            'x-rapidapi-host': 'api-formula-1.p.rapidapi.com',
            'x-rapidapi-key': '17a4d6af04mshf2c8ad3b31d4b9ap11bec7jsn67dc7e1e0c80'
        }
    };
    
return options;

};


