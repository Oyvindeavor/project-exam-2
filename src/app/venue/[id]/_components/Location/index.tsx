import LocationMap from '@/components/LocationMap'
import type { Location } from '@/types/NoroffApi/shared'

interface LocationProps {
  location: Location
}

export default function Location({ location }: LocationProps) {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY // Getting api key from env Server side
  return (
    <div className='card shadow'>
      <div className='card-body p-4'>
        <h2 className='h4 mb-3'>Location</h2>

        <div className='row g-3 mb-4'>
          {location.address && (
            <div className='col-md-6'>
              <p className='mb-1 text-muted small'>Address</p>
              <p className='mb-0'>{location.address}</p>
            </div>
          )}

          {location.city && (
            <div className='col-md-3'>
              <p className='mb-1 text-muted small'>City</p>
              <p className='mb-0'>{location.city}</p>
            </div>
          )}

          {location.zip && (
            <div className='col-md-3'>
              <p className='mb-1 text-muted small'>Zip</p>
              <p className='mb-0'>{location.zip}</p>
            </div>
          )}

          {location.country && (
            <div className='col-md-6'>
              <p className='mb-1 text-muted small'>Country</p>
              <p className='mb-0'>{location.country}</p>
            </div>
          )}

          {location.continent && (
            <div className='col-md-6'>
              <p className='mb-1 text-muted small'>Continent</p>
              <p className='mb-0'>{location.continent}</p>
            </div>
          )}
        </div>

        <div className='mt-4'>
          {location.lat && location.lng ? (
            <div id='map' className='rounded overflow-hidden'>
              {googleMapsApiKey ? (
                <LocationMap apiKey={googleMapsApiKey} lat={location.lat} lng={location.lng} />
              ) : (
                <div className='alert alert-light text-center'>
                  Google Maps API key is not available
                </div>
              )}
            </div>
          ) : (
            <div className='alert alert-light text-center'>Location coordinates not available</div>
          )}
        </div>
      </div>
    </div>
  )
}
