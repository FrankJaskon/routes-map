import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { UseUpdateMarkers } from './use-update-markers.interfaces'
import { Point } from '../../../shared'

export const useUpdateMarkers: UseUpdateMarkers = ({
  mapRef,
  isLoaded,
  points,
  onMarkerDragEnd,
  onAddPoint,
}) => {
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null,
  )
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null)

  useEffect(() => {
    if (infoWindow && selectedPoint) {
      infoWindow.open(mapRef.current)
    }
  }, [infoWindow, mapRef, selectedPoint])

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      markersRef.current.forEach(marker => {
        marker.map = null
      })
      markersRef.current = []

      points.forEach(point => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: point.position,
          map: mapRef.current!,
          title: point.name,
          gmpDraggable: true,
        })

        marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            onMarkerDragEnd(point.id, {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            })
          }
        })

        marker.addListener('click', () => {
          setSelectedPoint(point)
          setInfoWindow(
            new google.maps.InfoWindow({
              content: `<div>${point.name}</div>`,
              position: point.position,
              disableAutoPan: true,
              minWidth: 50,
              maxWidth: 300,
            }),
          )
        })

        markersRef.current.push(marker)
      })
    }
  }, [isLoaded, points, onMarkerDragEnd, mapRef])

  const handleAddPoint = useCallback(
    (name: string) => {
      if (mapRef.current) {
        const mapCenter = mapRef.current.getCenter()
        const newPoint: Point = {
          id: Date.now(),
          name,
          position: {
            lat: mapCenter!.lat(),
            lng: mapCenter!.lng(),
          },
        }
        onAddPoint(newPoint.position, newPoint.name)
      }
    },
    [mapRef, onAddPoint],
  )

  const handleEnterPressed = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleAddPoint(e.currentTarget.value)
        e.currentTarget.value = ''
      }
    },
    [handleAddPoint],
  )

  return {
    mapRef,
    handleEnterPressed,
  }
}
