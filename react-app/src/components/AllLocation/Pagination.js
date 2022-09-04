import React from 'react'

const Pagination = ({ totalPage, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(totalPage + 1).keys()].slice(1)



    const nextPage = () => {
        if (currentPage !== totalPage) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <div className='pagination-nav flex'>
            <div className='pagination-all flex'>
                <div className="pagination-control">
                    <a className="pagination-link"
                        onClick={prevPage}
                        href='#'>

                        Previous
                    </a>
                </div>
                {pageNumbers.map(pgNumber => (
                    <div key={pgNumber}
                        className={`pagination-control ${currentPage == pgNumber ? 'current-page' : ''} `} >

                        <a onClick={() => setCurrentPage(pgNumber)}
                            className='pagination-link'
                            href='#'>

                            {pgNumber}
                        </a>
                    </div>
                ))}
                <div className="pagination-control">
                    <a className="pagination-link"
                        onClick={nextPage}
                        href='#'>

                        Next
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Pagination
