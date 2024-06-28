import { renderHook, act } from '@testing-library/react-hooks'
import { useDraggableRoute } from './use-draggable-route'
import { Point } from '../../../shared'

describe('useDraggableRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const points: Point[] = [
    { id: 1, name: 'Point 1', position: { lat: 50, lng: 30 } },
    { id: 2, name: 'Point 2', position: { lat: 51, lng: 31 } },
    { id: 3, name: 'Point 3', position: { lat: 52, lng: 32 } },
  ]
  const onReorder = jest.fn()

  it('should set dragged item index on drag start', () => {
    const { result } = renderHook(() =>
      useDraggableRoute({ points, onReorder }),
    )

    act(() => {
      result.current.onDragStart(1)()
    })

    expect(result.current.draggedItemIndex).toBe(1)
  })

  it('should update order and set dragged item index on drag enter', () => {
    const { result } = renderHook(() =>
      useDraggableRoute({ points, onReorder }),
    )

    act(() => {
      result.current.onDragStart(0)()
    })

    act(() => {
      result.current.onDragEnter(2)({
        preventDefault: jest.fn(),
      } as any)
    })

    expect(result.current.draggedItemIndex).toBe(2)
    expect(onReorder).toHaveBeenCalledWith([
      { id: 2, name: 'Point 2', position: { lat: 51, lng: 31 } },
      { id: 3, name: 'Point 3', position: { lat: 52, lng: 32 } },
      { id: 1, name: 'Point 1', position: { lat: 50, lng: 30 } },
    ])
  })

  it('should reset dragged item index on drag end', () => {
    const { result } = renderHook(() =>
      useDraggableRoute({ points, onReorder }),
    )

    act(() => {
      result.current.onDragStart(0)()
    })

    act(() => {
      result.current.onDragEnd()
    })

    expect(result.current.draggedItemIndex).toBeNull()
  })
})
