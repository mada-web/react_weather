import { useState, useEffect } from 'react'

import InputComponent from '../components/Input'
import ButtonComponent from '../components/Button'

export const Home = (props) => {
  const { history } = props
  const [searchInput, setSearchInput] = useState('')

  const [error, setError] = useState(null)

  const onSearchClick = () => {
    history.push(`/weather/${searchInput}`)
  }

  const showFav = () => {
    return history.push('/favorites')
  }

  const showToDo = () => {
    return history.push('/todo')
  }

  return (
    <div className="actions">
      <div className="search">
        <InputComponent
          value={searchInput}
          setValue={setSearchInput}
          error={error}
          placeholder={'Enter city name'}
          list={'cities'}
        />
        <ButtonComponent
          onClick={onSearchClick}
          name={'search'}
          color={'red'}
          size={'massive'}
        />
      </div>
      <div className="fav_view">
        <ButtonComponent
          onClick={showFav}
          name={'favorite'}
          color={'red'}
          size={'massive'}
        />
        <ButtonComponent
          onClick={showToDo}
          name={'clipboard check'}
          color={'black'}
          size={'massive'}
        />
      </div>
    </div>
  )
}
