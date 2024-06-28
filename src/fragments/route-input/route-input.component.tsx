import React, { memo } from 'react'
import { useUpdateMarkers } from './services'
import { RouteInputProps } from './route-input.interfaces'

export const RouteInput = memo(function RouteInput({
  points,
  onMarkerDragEnd,
  onAddPoint,
  mapRef,
  isLoaded,
}: RouteInputProps) {
  const { handleEnterPressed } = useUpdateMarkers({
    isLoaded,
    points,
    onMarkerDragEnd,
    onAddPoint,
    mapRef,
  })

  return (
    <input
      type="text"
      placeholder="Enter point name"
      onKeyUp={handleEnterPressed}
      style={{ boxSizing: 'border-box', width: 300 }}
    />
  )
})
