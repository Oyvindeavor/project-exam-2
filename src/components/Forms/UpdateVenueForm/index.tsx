'use client'

import React, { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import {
  updateVenueAction,
  UpdateVenueFormState,
} from '@/components/Forms/UpdateVenueForm/updateVenueActions'
import type { VenuesResponseSingle } from '@/types/NoroffApi/response/venuesResponse'

const AMENITY_KEYS = ['wifi', 'parking', 'breakfast', 'pets'] as const
type AmenityKeyType = (typeof AMENITY_KEYS)[number]

interface VenueMeta {
  wifi?: boolean
  parking?: boolean
  breakfast?: boolean
  pets?: boolean
}

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
    fieldValues: {
      name: venue.name,
      description: venue.description,
      media: venue.media || [],
      price: venue.price,
      maxGuests: venue.maxGuests,
      rating: venue.rating === null ? undefined : venue.rating,
      meta: (venue.meta as VenueMeta) || {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: venue.location || {
        address: undefined,
        city: undefined,
        zip: undefined,
        country: undefined,
        continent: undefined,
        lat: undefined,
        lng: undefined,
      },
    },
    success: false,
  }
  const updateVenueActionWithId = updateVenueAction.bind(null, venue.id)
  const [state, formAction] = useActionState(updateVenueActionWithId, initialState)

  useEffect(() => {
    if (state.message && !state.success) {
      console.error('Form Error Message:', state.message)
    }
    if (state.success && state.message) {
      console.log('Form Success Message:', state.message)
    }
  }, [state])

  const getDefaultValue = (fieldName: keyof NonNullable<UpdateVenueFormState['fieldValues']>) => {
    return state.fieldValues?.[fieldName] ?? venue[fieldName as keyof typeof venue] ?? ''
  }

  const getDefaultChecked = (fieldName: AmenityKeyType): boolean => {
    const stateMeta = state.fieldValues?.meta as VenueMeta | undefined
    if (stateMeta && typeof stateMeta === 'object' && fieldName in stateMeta) {
      return !!stateMeta[fieldName]
    }
    const venueMeta = venue.meta as VenueMeta | undefined
    if (venueMeta && typeof venueMeta === 'object' && fieldName in venueMeta) {
      return !!venueMeta[fieldName]
    }
    return false
  }

  const getDefaultLocationValue = (
    fieldName: keyof NonNullable<NonNullable<UpdateVenueFormState['fieldValues']>['location']>
  ) => {
    const stateLocation = state.fieldValues?.location
    if (stateLocation && typeof stateLocation === 'object' && fieldName in stateLocation) {
      const value = stateLocation[fieldName as keyof typeof stateLocation]
      return value ?? ''
    }
    const venueLocation = venue.location
    if (venueLocation && typeof venueLocation === 'object' && fieldName in venueLocation) {
      const value = venueLocation[fieldName as keyof typeof venue.location]
      return value ?? ''
    }
    return ''
  }

  const getDefaultMediaValue = (index: number, fieldName: 'url' | 'alt'): string => {
    const stateMedia = state.fieldValues?.media
    if (stateMedia && Array.isArray(stateMedia) && stateMedia[index]) {
      const value = stateMedia[index][fieldName]
      return value ?? ''
    }
    const venueMedia = venue.media
    if (venueMedia && Array.isArray(venueMedia) && venueMedia[index]) {
      const value = venueMedia[index][fieldName]
      return value ?? ''
    }
    return ''
  }

  return (
    <form action={formAction}>
      <h2 className='mb-4 text-center'>Update Venue: {venue.name}</h2>

      {state.message && !state.success && !state.errors?.general && (
        <div className='alert alert-warning' role='alert'>
          {state.message}
        </div>
      )}
      {state.errors?.general && (
        <div className='alert alert-danger' role='alert'>
          {state.errors.general}
        </div>
      )}
      {state.message && state.success && (
        <div className='alert alert-success' role='alert'>
          {state.message}
        </div>
      )}

      {/* Name */}
      <div className='form-floating mb-3'>
        <input
          type='text'
          name='name'
          id='name'
          className={`form-control ${state.errors?.name ? 'is-invalid' : ''}`}
          placeholder='Venue Name'
          defaultValue={getDefaultValue('name') as string}
          aria-describedby='name-error'
          required
        />
        <label htmlFor='name'>Name</label>
        {state.errors?.name && (
          <div id='name-error' className='invalid-feedback'>
            {state.errors.name}
          </div>
        )}
      </div>

      {/* Description */}
      <div className='form-floating mb-3'>
        <textarea
          name='description'
          id='description'
          className={`form-control ${state.errors?.description ? 'is-invalid' : ''}`}
          placeholder='Venue Description'
          defaultValue={getDefaultValue('description') as string}
          aria-describedby='description-error'
          required
          rows={4}
          style={{ height: '100px' }}
        />
        <label htmlFor='description'>Description</label>
        {state.errors?.description && (
          <div id='description-error' className='invalid-feedback'>
            {state.errors.description}
          </div>
        )}
      </div>

      {/* Media Fields */}
      <fieldset className='mb-3 border p-3 rounded'>
        <legend className='form-label fs-6 fw-semibold'>Venue Media (Update up to 3 images)</legend>
        {[0, 1, 2].map((index) => (
          <div
            key={`media-group-${index}`}
            className={`mb-3 p-2 border rounded bg-light ${index === 2 ? 'mb-0' : ''}`}
          >
            <p className='fw-semibold mb-2'>Image {index + 1}</p>
            <div className='form-floating mb-2'>
              <input
                type='url'
                name={`media[${index}][url]`}
                id={`mediaUrl${index}`}
                className={`form-control ${state.errors?.media ? 'is-invalid' : ''}`}
                placeholder={`https://example.com/image${index + 1}.jpg`}
                defaultValue={getDefaultMediaValue(index, 'url')}
                aria-describedby={`mediaUrl${index}-error`}
              />
              <label htmlFor={`mediaUrl${index}`}>Image URL {index + 1}</label>
            </div>
            <div className='form-floating'>
              <input
                type='text'
                name={`media[${index}][alt]`}
                id={`mediaAlt${index}`}
                className='form-control'
                placeholder={`Alt text for Image ${index + 1}`}
                defaultValue={getDefaultMediaValue(index, 'alt')}
                aria-describedby={`mediaAlt${index}-error`}
              />
              <label htmlFor={`mediaAlt${index}`}>Alt Text {index + 1}</label>
            </div>
          </div>
        ))}
        {state.errors?.media && (
          <div id='media-general-error' className='invalid-feedback d-block mt-2'>
            {state.errors.media}
          </div>
        )}
      </fieldset>

      {/* Price */}
      <div className='form-floating mb-3'>
        <input
          type='number'
          name='price'
          id='price'
          className={`form-control ${state.errors?.price ? 'is-invalid' : ''}`}
          placeholder='Price per night'
          defaultValue={getDefaultValue('price') as number | string}
          aria-describedby='price-error'
          required
          step='0.01'
          min='0'
        />
        <label htmlFor='price'>Price (per night)</label>
        {state.errors?.price && (
          <div id='price-error' className='invalid-feedback'>
            {state.errors.price}
          </div>
        )}
      </div>

      {/* Max Guests */}
      <div className='form-floating mb-3'>
        <input
          type='number'
          name='maxGuests'
          id='maxGuests'
          className={`form-control ${state.errors?.maxGuests ? 'is-invalid' : ''}`}
          placeholder='Maximum Guests'
          defaultValue={getDefaultValue('maxGuests') as number | string}
          aria-describedby='maxGuests-error'
          required
          step='1'
          min='1'
        />
        <label htmlFor='maxGuests'>Max Guests</label>
        {state.errors?.maxGuests && (
          <div id='maxGuests-error' className='invalid-feedback'>
            {state.errors.maxGuests}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className='form-floating mb-3'>
        <input
          type='number'
          name='rating'
          id='rating'
          className={`form-control ${state.errors?.rating ? 'is-invalid' : ''}`}
          placeholder='Rating (0-5)'
          defaultValue={getDefaultValue('rating') as number | string | undefined}
          aria-describedby='rating-error'
          min='0'
          max='5'
          step='0.1'
        />
        <label htmlFor='rating'>Rating (0-5)</label>
        {state.errors?.rating && (
          <div id='rating-error' className='invalid-feedback'>
            {state.errors.rating}
          </div>
        )}
      </div>

      <fieldset className='mb-3 border p-3 rounded'>
        <legend className='form-label fs-6 fw-semibold'>Amenities</legend>
        {AMENITY_KEYS.map((amenity) => (
          <div className={`form-check ${amenity !== 'pets' ? 'mb-2' : ''}`} key={amenity}>
            <input
              type='checkbox'
              name={amenity}
              id={amenity}
              className='form-check-input'
              defaultChecked={getDefaultChecked(amenity)}
            />
            <label htmlFor={amenity} className='form-check-label text-capitalize'>
              {amenity === 'pets' ? 'Pets Allowed' : amenity}
            </label>
          </div>
        ))}
      </fieldset>

      {/* Location */}
      <fieldset className='mb-3 border p-3 rounded'>
        <legend className='form-label fs-6 fw-semibold'>Location</legend>
        {(['address', 'city', 'zip', 'country', 'continent'] as const).map((field) => (
          <div className='form-floating mb-3' key={field}>
            <input
              type='text'
              name={field}
              id={field}
              className={`form-control ${state.errors?.[field as keyof UpdateVenueFormState['errors']] ? 'is-invalid' : ''}`}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              defaultValue={getDefaultLocationValue(field)}
              aria-describedby={`${field}-error`}
            />
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {state.errors?.[field as keyof UpdateVenueFormState['errors']] && (
              <div id={`${field}-error`} className='invalid-feedback'>
                {state.errors[field as keyof UpdateVenueFormState['errors']]}
              </div>
            )}
          </div>
        ))}
        {/* Latitude */}
        <div className='form-floating mb-3'>
          <input
            type='number'
            name='lat'
            id='lat'
            className={`form-control ${state.errors?.lat ? 'is-invalid' : ''}`}
            placeholder='Latitude (e.g., 60.3913)'
            defaultValue={getDefaultLocationValue('lat') as number | string | undefined}
            aria-describedby='lat-error'
            step='any'
          />
          <label htmlFor='lat'>Latitude</label>
          {state.errors?.lat && (
            <div id='lat-error' className='invalid-feedback'>
              {state.errors.lat}
            </div>
          )}
        </div>
        {/* Longitude */}
        <div className='form-floating'>
          <input
            type='number'
            name='lng'
            id='lng'
            className={`form-control ${state.errors?.lng ? 'is-invalid' : ''}`}
            placeholder='Longitude (e.g., 5.3221)'
            defaultValue={getDefaultLocationValue('lng') as number | string | undefined}
            aria-describedby='lng-error'
            step='any'
          />
          <label htmlFor='lng'>Longitude</label>
          {state.errors?.lng && (
            <div id='lng-error' className='invalid-feedback'>
              {state.errors.lng}
            </div>
          )}
        </div>
      </fieldset>

      <div className='mt-4'>
        <SubmitButton />
      </div>
    </form>
  )
}
