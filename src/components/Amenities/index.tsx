import { CircleParking, Wifi, PawPrint, Coffee } from 'lucide-react'

interface AmenitiesProps {
  amenities: {
    wifi?: boolean
    parking?: boolean
    breakfast?: boolean
    pets?: boolean
  }
}

export default function Amenities({ amenities }: AmenitiesProps) {
  return (
    <div className='d-flex flex-wrap gap-2 mb-3'>
      {amenities.parking && (
        <span className='badge badge bg-light text-dark '>
          <CircleParking className='me-1' color='#6c757d' size={15} />
          Parking
        </span>
      )}
      {amenities.wifi && (
        <span className='badge bg-light text-dark'>
          <Wifi className='me-1' color='#0d6efd' size={15} />
          Wi-Fi
        </span>
      )}
      {amenities.breakfast && (
        <span className='badge bg-light text-dark'>
          <Coffee className='me-1' color='#198754' size={15} />
          Breakfast
        </span>
      )}
      {amenities.pets && (
        <span className='badge bg-light text-dark'>
          <PawPrint className='me-1' color='#fd7e14' size={15} />
          Pets
        </span>
      )}
    </div>
  )
}
