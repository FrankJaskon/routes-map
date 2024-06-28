import { useCallback, useState } from 'react'
import { Point } from '../../../shared'
import { UsePoint } from './use-points.interfaces'

export const usePoints: UsePoint = () => {
  const [points, setPoints] = useState<Point[]>([])

  const handleDeletePoint = useCallback(
    (id: number) => {
      setPoints(points.filter(point => point.id !== id))
    },
    [points],
  )

  const handleMarkerDragEnd = useCallback(
    (id: number, position: google.maps.LatLngLiteral) => {
      setPoints(
        points.map(point => (point.id === id ? { ...point, position } : point)),
      )
    },
    [points],
  )

  const handleReorderPoints = useCallback((newPoints: Point[]) => {
    setPoints(newPoints)
  }, [])

  const handleAddPoint = useCallback(
    (position: google.maps.LatLngLiteral, name: string) => {
      const newPoint: Point = {
        id: Date.now(),
        name,
        position,
      }
      setPoints([...points, newPoint])
    },
    [points],
  )

  return {
    points,
    handleDeletePoint,
    handleMarkerDragEnd,
    handleAddPoint,
    handleReorderPoints,
  }
}
