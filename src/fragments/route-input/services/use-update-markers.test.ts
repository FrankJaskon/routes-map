import { renderHook, act } from '@testing-library/react-hooks'
import { useUpdateMarkers } from './use-update-markers'
import { Point } from '../../../shared'
import { initialize, Map } from '@googlemaps/jest-mocks'
import { KeyboardEvent } from 'react'

jest.mock('@react-google-maps/api', () => ({
  useJsApiLoader: jest.fn().mockReturnValue({ isLoaded: true }),
}))

describe('useUpdateMarkers', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    initialize()
  })

  const points: Point[] = [
    { id: 1, name: 'Point 1', position: { lat: 50, lng: 30 } },
    { id: 2, name: 'Point 2', position: { lat: 51, lng: 31 } },
  ]
  const mapRef = {
    current: {
      getCenter: jest.fn().mockReturnValue({ lat: () => 52, lng: () => 32 }),
      setCenter: jest.fn(),
    } as Map,
  }
  const onMarkerDragEnd = jest.fn()

  const onAddPoint = jest.fn()

  it('should handle Enter key press and add point', async () => {
    const { result } = renderHook(() =>
      useUpdateMarkers({
        mapRef,
        isLoaded: true,
        points,
        onMarkerDragEnd,
        onAddPoint,
      }),
    )

    const event = {
      key: 'Enter',
      currentTarget: { value: 'New Point' },
    }

    act(() => {
      result.current.handleEnterPressed(
        event as KeyboardEvent<HTMLInputElement>,
      )
    })

    expect(onAddPoint).toHaveBeenCalledWith({ lat: 52, lng: 32 }, 'New Point')
  })
})
