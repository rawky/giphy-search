import React, {useEffect, useState, useData} from "react";
import axios from 'axios';
import Loader from './Loader';   

const Top = () => {
        const [ data, setData ] = useState([]);
        const [search,setSearch] = useState("");
        const [isLoading, setIsloading] = useState(false);
        const [isError, setIsError] = useState(false)
        useEffect(() => {
            const fectchData = async () => {
            setIsError(false)
            setIsloading(true);

            try {
                const results = await axios("https://api.giphy.com/v1/gifs/trending" , {
                params: {
                    api_key: "qx461iYvIRA211LI6NWOSqRRj6viRFTR",
                    limit:5
                }
            });
         
            console.log(results);
            setData(results.data.data);

                } catch (err){
                    setIsError(true)
                    console.log(err)
                }

            setIsloading(false)
        };
        
        fectchData();

    } , []);
     
    const renderGifs = () => {
        if(isLoading) {
            return <Loader />   
        }
        return data.map(el => {
            return(
                <div key={el.id} className="gif">
                    <img src={el.images.fixed_height.url} />
                </div>

            );

        });
    };

    const renderError = () => {
        if(isError) {
            return(
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    Unable to get GIFS , TRY AGAIN!
                </div>
            )
        }
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }
    const handleSubmit = async event => {
        event.preventDefault();
        setIsError(false);
        setIsloading(true);
            const results = await axios("https://api.giphy.com/v1/gifs/search", 
            {
                params: {
                    api_key:"qx461iYvIRA211LI6NWOSqRRj6viRFTR",
                    q: search
                }
            });

            setData(results.data.data);
            setIsloading(false)


    };

    return ( 
        <div className="m-2">
            {renderError()}
            <form className="form-inline justify-content-center m-2">
                <input value={search} onChange={handleSearchChange} type="text" placeholder="Gif Search" className="form-control" />
                <button onClick={handleSubmit} type="submit" className="btn btn-primary mx-2"> <i className='fas fa-search'></i> </button>
            </form>
            <div className="container gifs">{renderGifs()}</div>
        </div>
    )
};

export default Top;