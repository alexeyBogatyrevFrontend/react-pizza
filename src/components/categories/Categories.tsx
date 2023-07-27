import React from 'react'
import { useSelector } from 'react-redux'

type CategoriesType = {
    categories: string[]
    sortByCategoryHandler: (id: number) => void
}

const Categories: React.FC<CategoriesType> = ({
    categories,
    sortByCategoryHandler,
}) => {
    const categoryId = useSelector((state: any) => state.filterSlice.categoryId)

    return (
        <div className="categories">
            <ul>
                {categories.map((category: string, index: number) => (
                    <li
                        className={categoryId === index ? 'active' : ''}
                        key={index}
                        onClick={() => sortByCategoryHandler(index)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories
