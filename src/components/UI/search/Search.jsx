import React, { useCallback, useRef, useState } from 'react'

import c from './Search.module.scss'

import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearch } from '../../../redux/slices/filterSlice'

const Search = () => {
    const dispatch = useDispatch()

    const [value, setValue] = useState('')

    const inputRef = useRef()

    const refreshSearch = () => {
        dispatch(setSearch(''))
        setValue('')
        inputRef.current.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearch(str))
        }, 250),
        []
    )

    const onChangeInput = (e) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    return (
        <div className={c.input}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="30px"
                height="30px"
            >
                <path d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z" />
            </svg>
            <input
                ref={inputRef}
                value={value}
                placeholder="Поиск..."
                onChange={(e) => onChangeInput(e)}
            />
            {value.length ? (
                <svg
                    onClick={refreshSearch}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="50px"
                    height="50px"
                >
                    <path d="M 40.783203 7.2714844 A 2.0002 2.0002 0 0 0 39.386719 7.8867188 L 25.050781 22.222656 L 10.714844 7.8867188 A 2.0002 2.0002 0 0 0 9.2792969 7.2792969 A 2.0002 2.0002 0 0 0 7.8867188 10.714844 L 22.222656 25.050781 L 7.8867188 39.386719 A 2.0002 2.0002 0 1 0 10.714844 42.214844 L 25.050781 27.878906 L 39.386719 42.214844 A 2.0002 2.0002 0 1 0 42.214844 39.386719 L 27.878906 25.050781 L 42.214844 10.714844 A 2.0002 2.0002 0 0 0 40.783203 7.2714844 z" />
                </svg>
            ) : (
                ''
            )}
        </div>
    )
}

export default Search
