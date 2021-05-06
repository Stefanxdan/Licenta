import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filters from './Filters'
import Posts from './Posts'
import Pagination from './Pagination'
import './Posts.css'

export default function PostsPage() {

    const [totalPostsNumber, settotalPostsNumber] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(100);

    //initial Posts
    /*
    useEffect(() => {
        const fetchPosts = async () =>{
            setLoading(true);
            const res = await axios.get('/Posts');
            setPosts(res.data?.posts);
            settotalPostsNumber(res.data?.totalPostsNumber)
            setLoading(false);
        }
        
        fetchPosts();
    },[])
    */
    
    useEffect(() => {
        const fetchPosts = async () =>{
            setLoading(true);
            const params = {
                PageNumber: currentPage,
                PageSize: postsPerPage
            }
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
        
        fetchPosts();
    },[currentPage, postsPerPage])

    // Change page
    const paginate = (pageNumber) => { setCurrentPage(pageNumber); } 

    return (
        <>
            {loading ? (
                <div className="loading-spiner-container">
                    <i className="loading-spiner fas fa-spinner fa-pulse"></i>
                </div>
            ): err ? (
               <div className="err-response">{err}</div>
            ):(
            <>
                <div className="d-flex  justify-content-center" style={{maxWidth: "2000px", margin: "auto"}}>
                    <div className="d-flex align-items-flex-start justify-content-center mt-5" >
                        <Filters />
                        <Posts posts={posts}/>
                    </div>
                </div>
                <Pagination postPerPage={postsPerPage} totalPosts={totalPostsNumber} paginate={paginate} setPostsPerPage={setPostsPerPage}/>
            </>
            )}
        </>
    )
}
