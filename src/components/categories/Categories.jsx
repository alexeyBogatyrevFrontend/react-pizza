import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../../redux/slices/filterSlice'

const Categories = ({ categories }) => {
    const categoryId = useSelector((state) => state.filterSlice.categoryId)
    const dispatch = useDispatch()

    const sortByCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        className={categoryId === index ? 'active' : ''}
                        key={index}
                        onClick={() => sortByCategory(index)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories
