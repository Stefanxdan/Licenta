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
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(1);

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
            const res = await axios.get('/Posts', {params});
            setPosts(res.data?.posts);
            settotalPostsNumber(res.data?.totalPostsNumber)
            setLoading(false);
        }
        
        fetchPosts();
    },[currentPage])

    // Change page
    const paginate = (pageNumber) => { setCurrentPage(pageNumber); } 

    return (
        <>
            <div className="d-flex  justify-content-center" style={{maxWidth: "2000px", margin: "auto"}}>
                <div className="d-flex align-items-flex-start justify-content-center mt-5" >
                    <Filters />
                    <Posts posts={posts}/>
                </div>
            </div>
            <Pagination postPerPage={postsPerPage} totalPosts={totalPostsNumber} paginate={paginate}/>
        </>
    )
}
