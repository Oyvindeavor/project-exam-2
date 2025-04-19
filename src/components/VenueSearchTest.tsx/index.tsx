'use client'

import { useActionState } from 'react'
import { searchVenuesAction } from './action'

const initialState = {
  venues: [],
  query: '',
  message: null,
}

export default function SearchVenuesForm() {
  const [state, formAction] = useActionState(searchVenuesAction, initialState)

  return (
    <div className='container mt-4'>
      <form action={formAction} className='mb-4'>
        <div className='input-group'>
          <input
            name='q'
            type='text'
            className='form-control'
            placeholder='Search venues...'
            defaultValue={state.query}
          />
          <button className='btn btn-primary' type='submit'>
            Search
          </button>
        </div>
      </form>

      {state.message && <p className='text-danger'>{state.message}</p>}

      {state.venues.length > 0 && (
        <div className='row'>
          {state.venues.map((venue) => (
            <div className='col-md-4 mb-4' key={venue.id}>
              <div className='card h-100'>
                <div className='card-body'>
                  <h5 className='card-title'>{venue.name}</h5>
                  <p className='card-text'>{venue.description}</p>
                  <a href={`/venues/${venue.id}`} className='btn btn-outline-primary'>
                    View Venue
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
