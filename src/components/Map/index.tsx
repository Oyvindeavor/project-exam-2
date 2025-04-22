// LocationMap.tsx
'use client'
import { Map as GoogleMap, APIProvider, Marker } from '@vis.gl/react-google-maps'
import styles from './map.module.scss'

type Props = {
  lat: number
  lng: number
  zoom?: number
  apiKey: string
}

export default function LocationMap({ lat, lng, zoom = 14, apiKey }: Props) {
  return (
    <div className={styles.map}>
      <APIProvider apiKey={apiKey}>
        <GoogleMap center={{ lat, lng }} zoom={zoom} mapId='my-map-id'>
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      </APIProvider>
    </div>
  )
}
