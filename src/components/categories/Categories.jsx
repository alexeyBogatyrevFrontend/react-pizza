import React from 'react'

const Categories = ({ categoryId, setCategoryId }) => {
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    const sortByCategory = (id) => {
        setCategoryId(id)
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
