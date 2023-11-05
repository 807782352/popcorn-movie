import React from 'react'

export default function MovieDetails({movieId, onCloseMovieDetail}) {
  return (
    <div className='details'>
    <button className='btn-back' onClick={() => onCloseMovieDetail("")}>&larr;</button>
        {movieId}
    </div>
  )
}
