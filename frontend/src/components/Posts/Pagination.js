import React from 'react'

export default function Pagination({postPerPage, totalPosts, paginate}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <>
            <nav className="d-flex  justify-content-center mt-5" style={{maxWidth: "2000px", margin: "auto"}}>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="d-flex  justify-content-center">
                <span className="pl-3 pr-2">Posts Number: {totalPosts}</span>
                <span className="pl-2 pr-2">postPerPage: {postPerPage}</span>
            </div>
        </>
    )
}
