import React from 'react'

import c from './Pagination.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setPagination } from '../../redux/slices/filter/slice'

const Pagination: React.FC = () => {
    const pagination = useSelector((state: any) => state.filterSlice.pagination)
    const dispatch = useDispatch()

    return (
        <ul className={c.pagination}>
            <li
                onClick={() =>
                    dispatch(
                        setPagination(
                            pagination !== 1 ? pagination - 1 : pagination - 0
                        )
                    )
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
                    onClick={() => dispatch(setPagination(index + 1))}
                >
                    {index + 1}
                </li>
            ))}
            <li
                onClick={() =>
                    dispatch(
                        setPagination(
                            pagination !== 3 ? pagination + 1 : pagination + 0
                        )
                    )
                }
            >
                {'>'}
            </li>
        </ul>
    )
}

export default Pagination
