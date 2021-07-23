import React from "react"
import ContentLoader from "react-content-loader"
import './listLoader.css'

const ListLoader = (props) => (
  <ContentLoader className='load'
    speed={2}
    viewBox="0 0 476 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#d6d6d6"
    {...props}
  >
    <rect x="17" y="11" rx="0" ry="0" width="397" height="21" /> 
    <rect x="18" y="60" rx="0" ry="0" width="397" height="21" /> 
    <rect x="19" y="107" rx="0" ry="0" width="397" height="21" /> 
    <rect x="19" y="155" rx="0" ry="0" width="397" height="21" /> 
    <rect x="20" y="203" rx="0" ry="0" width="397" height="21" /> 
    <rect x="20" y="252" rx="0" ry="0" width="397" height="21" /> 
  </ContentLoader>
)

export default ListLoader

