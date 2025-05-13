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
      {state?.error && (
        <div className='alert alert-danger mt-3' role='alert'>
          {state.error}
        </div>
      )}

      {/* Name */}
      <div className='form-floating mb-3'>
        <input
          type='text'
          name='name'
          id='name'
          className='form-control'
          placeholder='Venue Name'
          required
        />
        <label htmlFor='name'>Name</label>
      </div>

      {/* Description */}
      <div className='form-floating mb-3 '>
        <textarea
          name='description'
          id='description'
          className='form-control'
          placeholder='Venue Description'
          required
          rows={4}
          style={{ height: '100px' }} // < Unable to move to CSS, as it conflicts with Bootstrap styles
        />
        <label htmlFor='description'>Description</label>
      </div>

      <fieldset className='mb-3 border p-3 rounded'>
        <legend className='form-label fs-6 fw-semibold'>Venue Media (Add up to 3 images)</legend>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`mb-3 p-2 border rounded bg-light ${index === 2 ? 'mb-0' : ''}`}
          >
            <p className='fw-semibold mb-2'>Image {index + 1}</p>
            <div className='form-floating mb-2'>
              <input
                type='url'
                name={`media[${index}][url]`}
                id={`mediaurl${index}`}
                className='form-control'
                placeholder={`https://example.com/image${index + 1}.jpg`}
              />
              <label htmlFor={`mediaurl${index}`}>Image URL {index + 1} (Optional)</label>
            </div>
            <div className='form-floating'>
              <input
                type='text'
                name={`media[${index}][alt]`}
                id={`mediaalt${index}`}
                className='form-control'
                placeholder={`Alt text for Image ${index + 1}`}
              />
              <label htmlFor={`mediaalt${index}`}>Alt Text {index + 1} (Optional)</label>
            </div>
          </div>
        ))}
      </fieldset>

      {/* Price */}
      <div className='form-floating mb-3'>
        <input
          type='number'
          name='price'
          id='price'
          className='form-control'
          placeholder='Price per night'
          required
          step='0.01'
          min='0'
        />
        <label htmlFor='price'>Price</label>
      </div>

      {/* Max Guests */}
      <div className='form-floating mb-3'>
        <input
          type='number'
          name='maxGuests'
          id='maxGuests'
          className='form-control'
          placeholder='Maximum Guests'
          required
          step='1'
          min='1'
        />
        <label htmlFor='maxGuests'>Max Guests</label>
      </div>

      {/* Rating */}
      <div className='form-floating mb-3'>
        <input
          type='number'
          name='rating'
          id='rating'
          className='form-control'
          placeholder='Rating (0-5, optional)'
          min='0'
          max='5'
          step='0.1' // Allow decimal ratings
        />
        <label htmlFor='rating'>Rating (optional)</label>
      </div>

      {/* Meta - Amenities */}
      <fieldset className='mb-3 border p-3 rounded'>
        <legend className='form-label fs-6 fw-semibold'>Amenities</legend>
        <div className='form-check mb-2'>
          <input type='checkbox' name='wifi' id='wifi' className='form-check-input' />
          <label htmlFor='wifi' className='form-check-label'>
            Wifi
          </label>
        </div>
        <div className='form-check mb-2'>
          <input type='checkbox' name='parking' id='parking' className='form-check-input' />
          <label htmlFor='parking' className='form-check-label'>
            Parking
          </label>
        </div>
        <div className='form-check mb-2'>
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
      </fieldset>

      {/* Location */}
      <fieldset className='mb-3 border p-3 rounded'>
        <legend className='form-label fs-6 fw-semibold'>Location</legend>
        <div className='form-floating mb-3'>
          <input
            type='text'
            name='address'
            id='address'
            className='form-control'
            placeholder='Street Address'
          />
          <label htmlFor='address'>Address</label>
        </div>
        <div className='form-floating mb-3'>
          <input type='text' name='city' id='city' className='form-control' placeholder='City' />
          <label htmlFor='city'>City</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            name='zip'
            id='zip'
            className='form-control'
            placeholder='Zip/Postal Code'
          />
          <label htmlFor='zip'>Zip</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            name='country'
            id='country'
            className='form-control'
            placeholder='Country'
          />
          <label htmlFor='country'>Country</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            name='continent'
            id='continent'
            className='form-control'
            placeholder='Continent'
          />
          <label htmlFor='continent'>Continent</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='number'
            name='lat'
            id='lat'
            className='form-control'
            placeholder='Latitude (optional)'
            step='any'
          />
          <label htmlFor='lat'>Latitude (optional)</label>
        </div>
        <div className='form-floating'>
          <input
            type='number'
            name='lng'
            id='lng'
            className='form-control'
            placeholder='Longitude (optional)'
            step='any'
          />
          <label htmlFor='lng'>Longitude (optional)</label>
        </div>
      </fieldset>

      <div className='mt-4'>
        <CreateVenueButton />
      </div>
    </form>
  )
}
