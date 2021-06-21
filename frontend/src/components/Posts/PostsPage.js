import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Filters from './Filters'
import Posts from './Posts'
import PaginationComp from './Pagination'
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

    const { idUser } = useParams()
    const [user, setUser] = useState(null)
    const [totalPostsNumber, settotalPostsNumber] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(50);
    const [filters, setFilters] = useState(initialFilters)


    const cityParam = window.location.href.split("CityLabel=")[1]?.replaceAll("%20"," ")
    if(cityParam){
        window.history.pushState("", "", '/posts');
        setFilters(prevState => ({
            ...prevState,
            "CityLabel": cityParam
        }));
    }

    useEffect(() => {
        const fetchPosts = async () =>{
            const rawParams = {
                PageNumber: currentPage,
                PageSize: postsPerPage
            }
            if(idUser)
                Object.assign(rawParams,{IdUser: idUser})
            Object.assign(rawParams,filters)
            const params = Object.fromEntries(Object.entries(rawParams)
                .filter(([key, value]) => ![null, "", 0, 1000].includes(value)))
            //console.log(params)
            await axios.get('/Posts', {params})
            .then(response => { 
                setPosts(null)
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

        const fetchUser = async () =>{
            await axios.get(`/Users/${idUser}`)
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {});
        } 

        setLoading(true);
        //setTimeout(() => {fetchPosts()},1000);

        if(idUser) 
            fetchUser();
        fetchPosts();
    },[currentPage, postsPerPage, filters,idUser])


    // Change page
    const paginate = (pageNumber) => { 
        setCurrentPage(pageNumber); } 

    return (
        <>
            <div style={{maxWidth: "1600px", margin: "auto"}}>
                <div className="title-user-posts">
                    {
                        user &&
                        <>Posts from {user?.role === "Provider" ? "provider" : "user"}: {user.username}</>
                    } 
                </div>
                <div className="postsPage-container" >
                    <Filters filters={filters} setFilters={setFilters} totalPosts={totalPostsNumber}/>
                    <div className="posts-container">
                        {loading ? (
                            <div className="loading-spiner-container-block">
                                <i className="loading-spiner fas fa-spinner fa-pulse"></i>
                            </div>
                        ): err ? (
                            <div className="err-response">{err}</div>
                        ): null}
                        <Posts posts={posts}/>
                    </div>
                </div>
                <PaginationComp
                    postPerPage={postsPerPage} totalPosts={totalPostsNumber} 
                    paginate={paginate} setPostsPerPage={setPostsPerPage} currentPage={currentPage}/>
            </div>
            
        </>
    )
}
