import { MutableRefObject } from 'react'
import { Point } from '../../shared'

export type OnAddPoint = (
  position: google.maps.LatLngLiteral,
  name: string,
) => void
export type OnMarkerDragEnd = (
  id: number,
  position: google.maps.LatLngLiteral,
) => void

export interface RouteInputProps {
  mapRef: MutableRefObject<google.maps.Map | null>
  points: Point[]
  isLoaded: boolean
  onMarkerDragEnd: OnMarkerDragEnd
  onAddPoint: OnAddPoint
}
