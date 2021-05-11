import {useState , useEffect } from 'react';
const useFetch = (url,requestOptions) => {
    const [data,setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        const abortFetch = new AbortController();
          let reqOps = requestOptions;
          let usefHeaders = requestOptions.headers;
          usefHeaders.append('signal',abortFetch.signal);
          reqOps.headers=usefHeaders;
          fetch(url,reqOps)
            .then(response => {
                if(!response.ok){
                    throw Error("Could not Fetch data");
                }
                return response.json();
            })
            .then(result => {
                setData(result);
                setIsLoading(false);
                setIsError(null);
            })
            .catch((e) =>{
                if(e.name==='AbortError'){
                    console.log("Fetch Aborted");
                }else{
                    console.log(e.message);
                    setIsError(e.message);
                }
            });

        return () => abortFetch.abort();
    }, [url,requestOptions])

    return { data , isLoading, isError};
}

export default useFetch;