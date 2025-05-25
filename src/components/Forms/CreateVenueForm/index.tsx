'use client'

import { useActionState } from 'react'
import createVenueFormAction from './createVenueFormAction'
import { CreateVenueButton } from './CreateVenueButton'
import {
  Info,
  Images,
  Wifi,
  ListCheck,
  ParkingCircle,
  ForkKnifeCrossedIcon,
  Dog,
  MapPin,
  CheckCircle,
  LucideAlertTriangle,
} from 'lucide-react'

export default function CreateVenueForm() {
  const [state, formAction] = useActionState(createVenueFormAction, {
    error: undefined,
  })

  import('bootstrap/js/dist/collapse')

  return (
    <div className='container-fluid px-0'>
      <form action={formAction} className='needs-validation' noValidate>
        {/* Error Alert */}
        {state?.error && (
          <div className='alert alert-danger alert-dismissible fade show mb-4' role='alert'>
            <LucideAlertTriangle className='me-2' />
            <strong>Error:</strong> {state.error}
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='alert'
              aria-label='Close'
            ></button>
          </div>
        )}

        {/* Basic Information Section */}
        <div className='card border-0 shadow-sm mb-4'>
          <div className='card-header shadow-sm bg-muted  py-3'>
            <h2 className='h5 mb-0'>
              <Info className='me-2 mb-1' />
              Basic Information
            </h2>
          </div>
          <div className='card-body p-4'>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <div className='form-floating'>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    className='form-control'
                    placeholder='Venue Name'
                    required
                  />
                  <label htmlFor='name'>Venue Name *</label>
                  <div className='invalid-feedback'>Please provide a venue name.</div>
                </div>
              </div>

              <div className='col-md-3 mb-3'>
                <div className='form-floating'>
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
                  <label htmlFor='price'>Price per Night *</label>
                  <div className='invalid-feedback'>Please enter a valid price.</div>
                </div>
              </div>

              <div className='col-md-3 mb-3'>
                <div className='form-floating'>
                  <input
                    type='number'
                    name='maxGuests'
                    id='maxGuests'
                    className='form-control'
                    placeholder='Maximum Guests'
                    required
                    step='1'
                    min='1'
                    max={100}
                  />
                  <label htmlFor='maxGuests'>Max Guests *</label>
                  <div className='invalid-feedback'>Please enter the maximum number of guests.</div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-9 mb-3'>
                <div className='form-floating'>
                  <textarea
                    name='description'
                    id='description'
                    className='form-control h-auto'
                    placeholder='Venue Description'
                    required
                    rows={4}
                  />
                  <label htmlFor='description'>Description *</label>
                  <div className='invalid-feedback'>
                    Please provide a description of your venue.
                  </div>
                </div>
              </div>

              <div className='col-md-3 mb-3'>
                <div className='form-floating'>
                  <input
                    type='number'
                    name='rating'
                    id='rating'
                    className='form-control'
                    placeholder='Rating (0-5, optional)'
                    min='0'
                    max='5'
                    step='0.1'
                  />
                  <label htmlFor='rating'>Rating (Optional)</label>
                  <small className='text-muted'>0.0 to 5.0</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className='card border-0 shadow-sm mb-4'>
          <div className='card-header shadow-sm bg-muted  py-3'>
            <h2 className='h5 mb-0'>
              <Images className='me-2 mb-1' />
              Venue Photos
            </h2>
            <small className='opacity-75'>Add up to 3 images to showcase your venue</small>
          </div>
          <div className='card-body p-4'>
            <div className='row'>
              {[0, 1, 2].map((index) => (
                <div key={index} className='col-lg-4 col-md-6 mb-4'>
                  <div className='border rounded-3 p-3 bg-light h-100'>
                    <div className='d-flex align-items-center mb-3'>
                      <h3 className='h6 mb-0'>Image {index + 1}</h3>
                      {index === 0 && <small className='text-muted ms-auto'>Primary</small>}
                    </div>

                    <div className='form-floating mb-3'>
                      <input
                        type='url'
                        name={`media[${index}][url]`}
                        id={`mediaurl${index}`}
                        className='form-control'
                        placeholder={`https://example.com/image${index + 1}.jpg`}
                      />
                      <label htmlFor={`mediaurl${index}`}>Image URL</label>
                    </div>

                    <div className='form-floating'>
                      <input
                        type='text'
                        name={`media[${index}][alt]`}
                        id={`mediaalt${index}`}
                        className='form-control'
                        placeholder={`Describe this image`}
                      />
                      <label htmlFor={`mediaalt${index}`}>Alt Text</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className='card border-0 shadow-sm mb-4'>
          <div className='card-header shadow-sm bg-muted  py-3'>
            <h2 className='h5 mb-0'>
              <ListCheck className='me-2 mb-1' />
              Amenities & Features
            </h2>
            <small className='opacity-75'>Select all amenities available at your venue</small>
          </div>
          <div className='card-body p-4'>
            <div className='row'>
              <div className='col-sm-6 col-lg-3 mb-3'>
                <div className='form-check form-check-lg'>
                  <input type='checkbox' name='wifi' id='wifi' className='form-check-input' />
                  <label htmlFor='wifi' className='form-check-label'>
                    <Wifi className='text-primary me-2' />
                    <strong>WiFi</strong>
                    <br />
                    <small className='text-muted'>High-speed internet</small>
                  </label>
                </div>
              </div>

              <div className='col-sm-6 col-lg-3 mb-3'>
                <div className='form-check form-check-lg'>
                  <input type='checkbox' name='parking' id='parking' className='form-check-input' />
                  <label htmlFor='parking' className='form-check-label'>
                    <ParkingCircle className='text-primary me-2' />
                    <strong>Parking</strong>
                    <br />
                    <small className='text-muted'>On-site parking</small>
                  </label>
                </div>
              </div>

              <div className='col-sm-6 col-lg-3 mb-3'>
                <div className='form-check form-check-lg'>
                  <input
                    type='checkbox'
                    name='breakfast'
                    id='breakfast'
                    className='form-check-input'
                  />
                  <label htmlFor='breakfast' className='form-check-label'>
                    <ForkKnifeCrossedIcon className='text-primary me-2' />
                    <strong>Breakfast</strong>
                    <br />
                    <small className='text-muted'>Morning meals included</small>
                  </label>
                </div>
              </div>

              <div className='col-sm-6 col-lg-3 mb-3'>
                <div className='form-check form-check-lg'>
                  <input type='checkbox' name='pets' id='pets' className='form-check-input' />
                  <label htmlFor='pets' className='form-check-label'>
                    <Dog className='text-primary me-2' />
                    <strong>Pet Friendly</strong>
                    <br />
                    <small className='text-muted'>Pets welcome</small>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className='card border-0 shadow-sm mb-4'>
          <div className='card-header shadow-sm bg-muted  py-3'>
            <h2 className='h5 mb-0'>
              <MapPin className='me-2 mb-1' />
              Location Details
            </h2>
            <small className='opacity-75'>Help guests find your venue easily</small>
          </div>
          <div className='card-body p-4'>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <div className='form-floating'>
                  <input
                    type='text'
                    name='address'
                    id='address'
                    className='form-control'
                    placeholder='Street Address'
                  />
                  <label htmlFor='address'>Street Address</label>
                </div>
              </div>

              <div className='col-md-6 mb-3'>
                <div className='form-floating'>
                  <input
                    type='text'
                    name='city'
                    id='city'
                    className='form-control'
                    placeholder='City'
                  />
                  <label htmlFor='city'>City</label>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-4 mb-3'>
                <div className='form-floating'>
                  <input
                    type='text'
                    name='zip'
                    id='zip'
                    className='form-control'
                    placeholder='Zip/Postal Code'
                  />
                  <label htmlFor='zip'>Zip/Postal Code</label>
                </div>
              </div>

              <div className='col-md-4 mb-3'>
                <div className='form-floating'>
                  <input
                    type='text'
                    name='country'
                    id='country'
                    className='form-control'
                    placeholder='Country'
                  />
                  <label htmlFor='country'>Country</label>
                </div>
              </div>

              <div className='col-md-4 mb-3'>
                <div className='form-floating'>
                  <input
                    type='text'
                    name='continent'
                    id='continent'
                    className='form-control'
                    placeholder='Continent'
                  />
                  <label htmlFor='continent'>Continent</label>
                </div>
              </div>
            </div>

            {/* Coordinates Accordion */}
            <div className='accordion mt-3' id='coordinatesAccordion'>
              <div className='accordion-item'>
                <h2 className='accordion-header'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#coordinatesCollapse'
                  >
                    GPS Coordinates (Optional)
                  </button>
                </h2>
                <div
                  id='coordinatesCollapse'
                  className='accordion-collapse collapse'
                  data-bs-parent='#coordinatesAccordion'
                >
                  <div className='accordion-body'>
                    <div className='row'>
                      <div className='col-md-6 mb-3'>
                        <div className='form-floating'>
                          <input
                            type='number'
                            name='lat'
                            id='lat'
                            className='form-control'
                            placeholder='Latitude'
                            step='any'
                          />
                          <label htmlFor='lat'>Latitude</label>
                          <small className='text-muted'>e.g., 40.7128</small>
                        </div>
                      </div>

                      <div className='col-md-6 mb-3'>
                        <div className='form-floating'>
                          <input
                            type='number'
                            name='lng'
                            id='lng'
                            className='form-control'
                            placeholder='Longitude'
                            step='any'
                          />
                          <label htmlFor='lng'>Longitude</label>
                          <small className='text-muted'>e.g., -74.0060</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className='card border-0 shadow-sm mb-4'>
          <div className='card-body p-4 text-center'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <p className='text-muted mb-3'>
                  <CheckCircle className='text-success me-2' />
                  Ready to list your venue? Review all information above and click create when
                  ready.
                </p>
                <CreateVenueButton />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
