'use client'

import { useActionState } from 'react'
import createVenueFormAction from './createVenueFormAction'
import { CreateVenueButton } from './CreateVenueButton'

export default function CreateVenueForm() {
  const [state, formAction] = useActionState(createVenueFormAction, {
    error: undefined,
  })

  return (
    <form action={formAction} className='w-100'>
      <h2 className='mb-4'>Create Venue</h2>

      {/* Name*/}
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input type='text' name='name' id='name' className='form-control' required />
      </div>

      {/* Description*/}
      <div className='mb-3'>
        <label htmlFor='description' className='form-label'>
          Description
        </label>
        <textarea name='description' id='description' className='form-control' required />
      </div>

      {/* Media Url*/}

      <div className='mb-3'>
        <label htmlFor='mediaurl' className='form-label'>
          Media URL
        </label>
        <input type='url' name='mediaurl' id='mediaurl' className='form-control' />
      </div>

      {/* Media alt*/}

      <div className='mb-3'>
        <label htmlFor='mediaalt' className='form-label'>
          Media alt
        </label>
        <input type='text' name='mediaalt' id='mediaalt' className='form-control' />
      </div>

      {/* Price*/}
      <div className='mb-3'>
        <label htmlFor='price' className='form-label'>
          Price
        </label>
        <input type='number' name='price' id='price' className='form-control' required />
      </div>

      {/* Max Guests*/}
      <div className='mb-3'>
        <label htmlFor='maxGuests' className='form-label'>
          Max Guests
        </label>
        <input type='number' name='maxGuests' id='maxGuests' className='form-control' required />
      </div>

      {/* Rating*/}
      <div className='mb-3'>
        <label htmlFor='rating' className='form-label'>
          Rating
        </label>
        <input type='number' name='rating' id='rating' className='form-control' />
      </div>

      {/* Meta*/}
      <div className='mb-3'>
        <label className='form-label'>Meta</label>
        <div className='form-check'>
          <input type='checkbox' name='wifi' id='wifi' className='form-check-input' />
          <label htmlFor='wifi' className='form-check-label'>
            Wifi
          </label>
        </div>
        <div className='form-check'>
          <input type='checkbox' name='parking' id='parking' className='form-check-input' />
          <label htmlFor='parking' className='form-check-label'>
            Parking
          </label>
        </div>
        <div className='form-check'>
          <input type='checkbox' name='breakfast' id='breakfast' className='form-check-input' />
          <label htmlFor='breakfast' className='form-check-label'>
            Breakfast
          </label>
        </div>
        <div className='form-check'>
          <input type='checkbox' name='pets' id='pets' className='form-check-input' />
          <label htmlFor='pets' className='form-check-label'>
            Pets
          </label>
        </div>
      </div>

      {/* Location*/}
      <div className='mb-3'>
        <label className='form-label'>Location</label>
        <div className='mb-3'>
          <label htmlFor='address' className='form-label'>
            Address
          </label>
          <input type='text' name='address' id='address' className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='city' className='form-label'>
            City
          </label>
          <input type='text' name='city' id='city' className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='zip' className='form-label'>
            Zip
          </label>
          <input type='text' name='zip' id='zip' className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='country' className='form-label'>
            Country
          </label>
          <input type='text' name='country' id='country' className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='continent' className='form-label'>
            Continent
          </label>
          <input type='text' name='continent' id='continent' className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='lat' className='form-label'>
            Latitude
          </label>
          <input type='number' name='lat' id='lat' className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='lng' className='form-label'>
            Longitude
          </label>
          <input type='number' name='lng' id='lng' className='form-control' />
        </div>
      </div>

      {/* Error message */}
      <div className='mb-3'>
        <label htmlFor='error' className='form-label'>
          Error
        </label>
        <input type='text' name='error' id='error' className='form-control' />
      </div>

      {state?.error && <div className='alert alert-danger'>{state.error}</div>}

      <CreateVenueButton />
    </form>
  )
}
