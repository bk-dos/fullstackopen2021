import React from 'react'

const Filter = ({searchText, onChange}) => {
  return (
    <div>
      filter shown with: <input value={searchText} onChange={onChange}/> 
    </div>
  )
}

export default Filter