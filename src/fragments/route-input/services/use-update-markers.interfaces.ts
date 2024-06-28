import { MutableRefObject, KeyboardEvent } from 'react'
import { Point } from '../../../shared'
import { OnAddPoint, OnMarkerDragEnd } from '../route-input.interfaces'

interface UseUpdateMarkersProps {
  mapRef: MutableRefObject<google.maps.Map | null>
  isLoaded: boolean
  points: Point[]
  onMarkerDragEnd: OnMarkerDragEnd
  onAddPoint: OnAddPoint
}

interface UseUpdateMarkersReturnedType {
  handleEnterPressed: (e: KeyboardEvent<HTMLInputElement>) => void
}

export type UseUpdateMarkers = (
  props: UseUpdateMarkersProps,
) => UseUpdateMarkersReturnedType
