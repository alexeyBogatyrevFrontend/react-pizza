import React, { useState } from 'react'

const Categories = () => {
    const [activeCategory, setActiveCategory] = useState(0)

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        className={activeCategory === index ? 'active' : ''}
                        key={index}
                        onClick={() => setActiveCategory(index)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories
