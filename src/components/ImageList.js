import React from 'react'
import './style.css'

const ImageList = ({images}) => {
  return (
    <div>
      {images.map((image, index) => {
        return (
          <img src={image.url} alt='...' key={`${index}-${image._id}`} width={200} height={150} className="image-selectedBlog"/>
        )
      })}
    </div>
  )
}

export default ImageList
