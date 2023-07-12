import React, { useContext } from 'react'

import c from './Pagination.module.scss'
import { AppContext } from '../../context/AppContext'

const Pagination = () => {
    const { pagination, setPagination } = useContext(AppContext)

    return (
        <ul className={c.pagination}>
            <li
                onClick={() =>
                    setPagination((prev) => (prev !== 1 ? prev - 1 : prev - 0))
                }
            >
                {'<'}
            </li>
            {[...new Array(3)].map((_, index) => (
                <li
                    className={
                        pagination === index + 1
                            ? `${c.pagination} ${c.active}`
                            : ''
                    }
                    key={index}
                    onClick={() => setPagination(index + 1)}
                >
                    {index + 1}
                </li>
            ))}
            <li
                onClick={() =>
                    setPagination((prev) => (prev !== 3 ? prev + 1 : prev + 0))
                }
            >
                {'>'}
            </li>
        </ul>
    )
}

export default Pagination
