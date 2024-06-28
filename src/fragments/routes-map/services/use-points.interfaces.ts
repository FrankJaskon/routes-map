import { Point } from '../../../shared'

interface UsePointsReturnedType {
  points: Point[]
  handleDeletePoint: (id: number) => void
  handleMarkerDragEnd: (id: number, position: google.maps.LatLngLiteral) => void
  handleAddPoint: (position: google.maps.LatLngLiteral, name: string) => void
  handleReorderPoints: (newPoints: Point[]) => void
}

export type UsePoint = () => UsePointsReturnedType
