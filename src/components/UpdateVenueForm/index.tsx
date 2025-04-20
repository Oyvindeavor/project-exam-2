'use client'

import React, { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { updateVenueAction, UpdateVenueFormState } from '@/components/UpdateVenueForm/venueActions'
import type { VenuesResponseSingle } from '@/types/NoroffApi/response/venuesResponse'

interface UpdateVenueFormProps {
  venue: VenuesResponseSingle['data']
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type='submit' className='btn btn-primary w-100' disabled={pending}>
      {pending ? 'Updating...' : 'Update Venue'}
    </button>
  )
}

export default function UpdateVenueForm({ venue }: UpdateVenueFormProps) {
  const initialState: UpdateVenueFormState = {
    message: '',
    errors: {},
    fieldValues: {},
    success: false,
  }
  const updateVenueActionWithId = updateVenueAction.bind(null, venue.id)
  const [state, formAction] = useActionState(updateVenueActionWithId, initialState)

  useEffect(() => {
    console.log('Form State Updated:', state)
    if (state.message && !state.success) {
      console.error('Form Error Message:', state.message)
    }
    if (state.success) {
      console.log('Form Success Message:', state.message)
    }
  }, [state])

  const getDefaultValue = (fieldName: keyof NonNullable<UpdateVenueFormState['fieldValues']>) => {
    return state.fieldValues?.[fieldName] ?? venue[fieldName as keyof typeof venue] ?? ''
  }
  const getDefaultChecked = (
    fieldName: keyof NonNullable<
      UpdateVenueFormState['fieldValues'] & { meta: Record<string, unknown> }['meta']
    >
  ) => {
    const stateValue = state.fieldValues?.meta?.[fieldName as keyof typeof venue.meta]
    if (stateValue !== undefined) {
      return stateValue
    }
    return venue.meta?.[fieldName as keyof typeof venue.meta] ?? false
  }
  const getDefaultLocationValue = (
    fieldName: keyof NonNullable<NonNullable<UpdateVenueFormState['fieldValues']>['location']>
  ) => {
    const stateValue = state.fieldValues?.location?.[fieldName]
    if (stateValue !== undefined && stateValue !== null) {
      return stateValue
    }
    const venueValue = venue.location?.[fieldName]
    return venueValue ?? ''
  }
  const getDefaultMediaValue = (fieldName: 'url' | 'alt') => {
    const stateValue = state.fieldValues?.media?.[0]?.[fieldName]
    if (stateValue !== undefined) {
      return stateValue
    }
    const venueValue = venue.media?.[0]?.[fieldName]
    return venueValue ?? ''
  }

  return (
    <form action={formAction} className='w-100' style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2 className='mb-4 text-center'>Update Venue: {venue.name}</h2>
      {state.message && !state.success && (
        <div className='alert alert-danger' role='alert'>
          {state.message}
        </div>
      )}
      {state.message && state.success && (
        <div className='alert alert-success' role='alert'>
          {state.message}
        </div>
      )}

      {/* Name */}
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          className={`form-control ${state.errors?.name ? 'is-invalid' : ''}`}
          defaultValue={getDefaultValue('name') as string}
          aria-describedby='name-error'
          required
        />
        {state.errors?.name && (
          <div id='name-error' className='invalid-feedback'>
            {state.errors.name.join(', ')}
          </div>
        )}
      </div>
      {/* Description */}
      <div className='mb-3'>
        <label htmlFor='description' className='form-label'>
          Description
        </label>
        <textarea
          name='description'
          id='description'
          className={`form-control ${state.errors?.description ? 'is-invalid' : ''}`}
          defaultValue={getDefaultValue('description') as string}
          aria-describedby='description-error'
          required
          rows={4}
        />
        {state.errors?.description && (
          <div id='description-error' className='invalid-feedback'>
            {state.errors.description.join(', ')}
          </div>
        )}
      </div>
      {/* Media Url */}
      <div className='mb-3'>
        <label htmlFor='mediaUrl' className='form-label'>
          Media URL
        </label>
        <input
          type='url'
          name='mediaUrl'
          id='mediaUrl'
          className={`form-control ${state.errors?.mediaUrl ? 'is-invalid' : ''}`}
          defaultValue={getDefaultMediaValue('url')}
          aria-describedby='mediaUrl-error'
        />
        {state.errors?.mediaUrl && (
          <div id='mediaUrl-error' className='invalid-feedback'>
            {state.errors.mediaUrl.join(', ')}
          </div>
        )}
      </div>
      {/* Media alt */}
      <div className='mb-3'>
        <label htmlFor='mediaAlt' className='form-label'>
          Media Alt Text
        </label>
        <input
          type='text'
          name='mediaAlt'
          id='mediaAlt'
          className={`form-control ${state.errors?.mediaAlt ? 'is-invalid' : ''}`}
          defaultValue={getDefaultMediaValue('alt')}
          aria-describedby='mediaAlt-error'
        />
        {state.errors?.mediaAlt && (
          <div id='mediaAlt-error' className='invalid-feedback'>
            {state.errors.mediaAlt.join(', ')}
          </div>
        )}
      </div>
      {/* Price */}
      <div className='mb-3'>
        <label htmlFor='price' className='form-label'>
          Price (per night)
        </label>
        <input
          type='number'
          name='price'
          id='price'
          className={`form-control ${state.errors?.price ? 'is-invalid' : ''}`}
          defaultValue={getDefaultValue('price') as number}
          aria-describedby='price-error'
          required
          step='0.01'
        />
        {state.errors?.price && (
          <div id='price-error' className='invalid-feedback'>
            {state.errors.price.join(', ')}
          </div>
        )}
      </div>
      {/* Max Guests */}
      <div className='mb-3'>
        <label htmlFor='maxGuests' className='form-label'>
          Max Guests
        </label>
        <input
          type='number'
          name='maxGuests'
          id='maxGuests'
          className={`form-control ${state.errors?.maxGuests ? 'is-invalid' : ''}`}
          defaultValue={getDefaultValue('maxGuests') as number}
          aria-describedby='maxGuests-error'
          required
          step='1'
        />
        {state.errors?.maxGuests && (
          <div id='maxGuests-error' className='invalid-feedback'>
            {state.errors.maxGuests.join(', ')}
          </div>
        )}
      </div>
      {/* Rating */}
      <div className='mb-3'>
        <label htmlFor='rating' className='form-label'>
          Rating (0-5)
        </label>
        <input
          type='number'
          name='rating'
          id='rating'
          className={`form-control ${state.errors?.rating ? 'is-invalid' : ''}`}
          defaultValue={getDefaultValue('rating') as number | undefined}
          aria-describedby='rating-error'
          min='0'
          max='5'
          step='0.1'
        />
        {state.errors?.rating && (
          <div id='rating-error' className='invalid-feedback'>
            {state.errors.rating.join(', ')}
          </div>
        )}
      </div>
      {/* Meta */}
      <fieldset className='mb-3 border p-3 rounded'>
        <legend className='form-label fs-6'>Amenities (Meta)</legend>
        <div className='form-check'>
          <input
            type='checkbox'
            name='wifi'
            id='wifi'
            className={`form-check-input ${state.errors?.wifi ? 'is-invalid' : ''}`}
            defaultChecked={getDefaultChecked('wifi')}
            aria-describedby='wifi-error'
          />
          <label htmlFor='wifi' className='form-check-label'>
            Wifi
          </label>
          {state.errors?.wifi && (
            <div id='wifi-error' className='invalid-feedback d-block'>
              {state.errors.wifi.join(', ')}
            </div>
          )}
        </div>
        <div className='form-check'>
          <input
            type='checkbox'
            name='parking'
            id='parking'
            className={`form-check-input ${state.errors?.parking ? 'is-invalid' : ''}`}
            defaultChecked={getDefaultChecked('parking')}
            aria-describedby='parking-error'
          />
          <label htmlFor='parking' className='form-check-label'>
            Parking
          </label>
          {state.errors?.parking && (
            <div id='parking-error' className='invalid-feedback d-block'>
              {state.errors.parking.join(', ')}
            </div>
          )}
        </div>
        <div className='form-check'>
          <input
            type='checkbox'
            name='breakfast'
            id='breakfast'
            className={`form-check-input ${state.errors?.breakfast ? 'is-invalid' : ''}`}
            defaultChecked={getDefaultChecked('breakfast')}
            aria-describedby='breakfast-error'
          />
          <label htmlFor='breakfast' className='form-check-label'>
            Breakfast
          </label>
          {state.errors?.breakfast && (
            <div id='breakfast-error' className='invalid-feedback d-block'>
              {state.errors.breakfast.join(', ')}
            </div>
          )}
        </div>
        <div className='form-check'>
          <input
            type='checkbox'
            name='pets'
            id='pets'
            className={`form-check-input ${state.errors?.pets ? 'is-invalid' : ''}`}
            defaultChecked={getDefaultChecked('pets')}
            aria-describedby='pets-error'
          />
          <label htmlFor='pets' className='form-check-label'>
            Pets Allowed
          </label>
          {state.errors?.pets && (
            <div id='pets-error' className='invalid-feedback d-block'>
              {state.errors.pets.join(', ')}
            </div>
          )}
        </div>
      </fieldset>
      {/* Location */}
      <fieldset className='mb-3 border p-3 rounded'>
        <legend className='form-label fs-6'>Location</legend>
        <div className='mb-3'>
          <label htmlFor='address' className='form-label'>
            Address
          </label>
          <input
            type='text'
            name='address'
            id='address'
            className={`form-control ${state.errors?.address ? 'is-invalid' : ''}`}
            defaultValue={getDefaultLocationValue('address') as string}
            aria-describedby='address-error'
          />
          {state.errors?.address && (
            <div id='address-error' className='invalid-feedback'>
              {state.errors.address.join(', ')}
            </div>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='city' className='form-label'>
            City
          </label>
          <input
            type='text'
            name='city'
            id='city'
            className={`form-control ${state.errors?.city ? 'is-invalid' : ''}`}
            defaultValue={getDefaultLocationValue('city') as string}
            aria-describedby='city-error'
          />
          {state.errors?.city && (
            <div id='city-error' className='invalid-feedback'>
              {state.errors.city.join(', ')}
            </div>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='zip' className='form-label'>
            Zip/Postal Code
          </label>
          <input
            type='text'
            name='zip'
            id='zip'
            className={`form-control ${state.errors?.zip ? 'is-invalid' : ''}`}
            defaultValue={getDefaultLocationValue('zip') as string}
            aria-describedby='zip-error'
          />
          {state.errors?.zip && (
            <div id='zip-error' className='invalid-feedback'>
              {state.errors.zip.join(', ')}
            </div>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='country' className='form-label'>
            Country
          </label>
          <input
            type='text'
            name='country'
            id='country'
            className={`form-control ${state.errors?.country ? 'is-invalid' : ''}`}
            defaultValue={getDefaultLocationValue('country') as string}
            aria-describedby='country-error'
          />
          {state.errors?.country && (
            <div id='country-error' className='invalid-feedback'>
              {state.errors.country.join(', ')}
            </div>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='continent' className='form-label'>
            Continent
          </label>
          <input
            type='text'
            name='continent'
            id='continent'
            className={`form-control ${state.errors?.continent ? 'is-invalid' : ''}`}
            defaultValue={getDefaultLocationValue('continent') as string}
            aria-describedby='continent-error'
          />
          {state.errors?.continent && (
            <div id='continent-error' className='invalid-feedback'>
              {state.errors.continent.join(', ')}
            </div>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='lat' className='form-label'>
            Latitude
          </label>
          <input
            type='number'
            name='lat'
            id='lat'
            className={`form-control ${state.errors?.lat ? 'is-invalid' : ''}`}
            defaultValue={getDefaultLocationValue('lat') as number | undefined}
            aria-describedby='lat-error'
            step='any'
          />
          {state.errors?.lat && (
            <div id='lat-error' className='invalid-feedback'>
              {state.errors.lat.join(', ')}
            </div>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='lng' className='form-label'>
            Longitude
          </label>
          <input
            type='number'
            name='lng'
            id='lng'
            className={`form-control ${state.errors?.lng ? 'is-invalid' : ''}`}
            defaultValue={getDefaultLocationValue('lng') as number | undefined}
            aria-describedby='lng-error'
            step='any'
          />
          {state.errors?.lng && (
            <div id='lng-error' className='invalid-feedback'>
              {state.errors.lng.join(', ')}
            </div>
          )}
        </div>
      </fieldset>
      {/* Submit Button */}
      <div className='mt-4'>
        <SubmitButton />
      </div>
    </form>
  )
}
