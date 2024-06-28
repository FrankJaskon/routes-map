import React, { FC } from 'react'
import { GoogleMap, Polyline } from '@react-google-maps/api'
import { useMap } from './services'
import { MapProps } from './map.interfaces'
import { center, containerStyle, mapOptions } from './map.constants'

export const Map: FC<MapProps> = ({ points, mapRef, setLoaded, isLoaded }) => {
  useMap({ setLoaded })

  if (!isLoaded) {
    return <div>Loading map...</div>
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={mapOptions}
        onLoad={map => {
          mapRef.current = map
        }}
      >
        <Polyline path={points.map(point => point.position)} />
      </GoogleMap>
    </div>
  )
}
