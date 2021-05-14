import React, {useRef} from 'react'

export default function Pagination({postPerPage, totalPosts, paginate, setPostsPerPage}) {
    const pageNumbers = [];
    const postPerPageRef = useRef()

    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <>
            <nav className="d-flex  justify-content-center mt-5" style={{maxWidth: "2000px", margin: "auto"}}>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <div onClick={() => paginate(number)} className="page-link">
                                {number}
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="d-flex  mb-5  justify-content-center">
                <span className="pl-3 pr-2">Posts Number: {totalPosts}</span>
                <span className="pl-2 pr-2">postPerPage: 
                    <input 
                        type="number"
                        value={postPerPage} 
                        ref={postPerPageRef}
                        min="1"
                        style={{width: "50px", textAlign: "center"}}
                        onChange={() => setPostsPerPage(postPerPageRef.current.value)}/>
                </span>
            </div>
        </>
    )
}
