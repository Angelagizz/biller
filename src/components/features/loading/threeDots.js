import React from 'react'
import ContentLoader from 'react-content-loader'

const ThreeDots = (props) => (
  <ContentLoader
  viewBox="0 0 110 12"
  height={12}
  width={110}
  backgroundColor="transparent"
  {...props}
>
  <circle cx="10" cy="6" r="6" />
  <circle cx="54" cy="6" r="6" />
  <circle cx="98" cy="6" r="6" />
</ContentLoader>
)

export default ThreeDots