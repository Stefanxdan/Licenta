import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filters from './Filters'
import Posts from './Posts'
import Pagination from './Pagination'
import './Posts.css'

const initialFilters = {
    Filters: true,
    IsLocal: null,
    ForRent: null,
    PriceMin: null,
    PriceMax: null,
    CityLabel: null,
    Bedrooms: null,
    Bathrooms: null,
    Type: null,
    Partitioning: null
}


export default function PostsPage() {

    const [totalPostsNumber, settotalPostsNumber] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(100);
    const [filters, setFilters] = useState(initialFilters)

    useEffect(() => {
        const fetchPosts = async () =>{
            const rawParams = {
                PageNumber: currentPage,
                PageSize: postsPerPage
            }
            Object.assign(rawParams,filters)
            const params = Object.fromEntries(Object.entries(rawParams)
                .filter(([key, value]) => ![null, "", 0, 1000].includes(value)))
            console.log(params)
            await axios.get('/Posts', {params})
            .then(response => { 
                setPosts(response.data?.posts);
                settotalPostsNumber(response.data?.totalPostsNumber)
            })
            .catch(error => {
                if(error?.response?.status)
                    setErr(error?.response?.status + " " + error?.response?.statusText)
                else
                    setErr("ERR_CONNECTION_REFUSED")
            });
            
            setLoading(false);
        }
        setLoading(true);
        //setTimeout(() => {fetchPosts()},1000);
        fetchPosts();
    },[currentPage, postsPerPage, filters])

    // Change page
    const paginate = (pageNumber) => { setCurrentPage(pageNumber); } 

    return (
        <>
            <div style={{maxWidth: "1600px", margin: "auto"}}>
                <div className="postsPage-container" >
                    <Filters filters={filters} setFilters={setFilters} totalPosts={totalPostsNumber}/>
                    <div className="posts-container">
                        {loading ? (
                            <div className="loading-spiner-container-block">
                                <i className="loading-spiner fas fa-spinner fa-pulse"></i>
                            </div>
                        ): err ? (
                            <div className="err-response">{err}</div>
                        ):(
                            <Posts posts={posts}/>
                        )}
                    </div>
                </div>
                <Pagination
                    postPerPage={postsPerPage} totalPosts={totalPostsNumber} 
                    paginate={paginate} setPostsPerPage={setPostsPerPage}/>
            </div>
            
        </>
    )
}
