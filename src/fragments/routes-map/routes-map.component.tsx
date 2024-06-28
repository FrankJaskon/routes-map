import React, { FC, memo, useRef, useState } from 'react'
import { RouteList } from '../route-list'
import { Map } from '../map'
import { usePoints } from './services'
import { RouteInput } from '../route-input'

export const RoutesMap: FC = memo(function RoutesMap() {
  const mapRef = useRef<google.maps.Map | null>(null)
  const [isLoaded, setLoaded] = useState(false)
  const {
    points,
    handleMarkerDragEnd,
    handleDeletePoint,
    handleAddPoint,
    handleReorderPoints,
  } = usePoints()

  return (
    <div style={{ height: '100%', width: 300 }}>
      <RouteList
        points={points}
        onDelete={handleDeletePoint}
        onReorder={handleReorderPoints}
      />
      <RouteInput
        mapRef={mapRef}
        points={points}
        onMarkerDragEnd={handleMarkerDragEnd}
        onAddPoint={handleAddPoint}
        isLoaded={isLoaded}
      />
      <Map
        points={points}
        mapRef={mapRef}
        setLoaded={setLoaded}
        isLoaded={isLoaded}
      />
    </div>
  )
})
