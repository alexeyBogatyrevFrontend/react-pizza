import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="134" cy="130" r="130" />
        <rect x="0" y="270" rx="10" ry="10" width="272" height="31" />
        <rect x="2" y="310" rx="10" ry="10" width="273" height="86" />
        <rect x="3" y="410" rx="10" ry="10" width="94" height="40" />
        <rect x="117" y="410" rx="20" ry="20" width="158" height="40" />
    </ContentLoader>
)

export default Skeleton
