import { renderHook, act } from '@testing-library/react-hooks'
import { usePoints } from './use-points'
import { Point } from '../../../shared'

describe('usePoints', () => {
  it('should add a point', () => {
    const { result } = renderHook(() => usePoints())

    const newPoint = { lat: 50, lng: 30 }
    const newName = 'New Point'

    expect(result.current.points).toHaveLength(0)

    act(() => {
      result.current.handleAddPoint(newPoint, newName)
    })

    expect(result.current.points).toHaveLength(1)
    expect(result.current.points[0]).toMatchObject({
      name: newName,
      position: newPoint,
    })
  })

  it('should delete a point', () => {
    const { result } = renderHook(() => usePoints())

    const point: Omit<Point, 'id'> = {
      name: 'Point 1',
      position: { lat: 50, lng: 30 },
    }

    act(() => {
      result.current.handleAddPoint(point.position, point.name)
    })

    expect(result.current.points).toHaveLength(1)

    act(() => {
      result.current.handleDeletePoint(result.current.points[0].id)
    })

    expect(result.current.points).toHaveLength(0)
  })

  it('should update point position on marker drag end', () => {
    const { result } = renderHook(() => usePoints())

    const point: Omit<Point, 'id'> = {
      name: 'Point 1',
      position: { lat: 50, lng: 30 },
    }

    act(() => {
      result.current.handleAddPoint(point.position, point.name)
    })

    const newPosition = { lat: 51, lng: 31 }

    act(() => {
      result.current.handleMarkerDragEnd(
        result.current.points[0].id,
        newPosition,
      )
    })

    expect(result.current.points[0].position).toMatchObject(newPosition)
  })

  it('should reorder points', () => {
    const { result } = renderHook(() => usePoints())

    const points: Omit<Point, 'id'>[] = [
      { name: 'Point 1', position: { lat: 50, lng: 30 } },
      { name: 'Point 2', position: { lat: 51, lng: 31 } },
    ]

    act(() => {
      result.current.handleAddPoint(points[0].position, points[0].name)
      result.current.handleAddPoint(points[1].position, points[1].name)
    })

    const newOrder = [result.current.points[1], result.current.points[0]]

    act(() => {
      result.current.handleReorderPoints(newOrder)
    })

    expect(result.current.points).toEqual(newOrder)
  })
})
