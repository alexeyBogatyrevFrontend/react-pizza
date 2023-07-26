import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../../redux/slices/filterSlice'

type CategoriesType = {
    categories: string[]
}

const Categories: React.FC<CategoriesType> = ({ categories }) => {
    const categoryId = useSelector((state: any) => state.filterSlice.categoryId)
    const dispatch = useDispatch()

    const sortByCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((category: string, index: number) => (
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
