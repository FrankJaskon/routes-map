import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RouteInput } from '../route-input.component'
import { Point } from '../../../shared'
import { useUpdateMarkers } from '../services'
import { Map } from '@googlemaps/jest-mocks'

jest.mock('../services', () => ({
  useUpdateMarkers: jest.fn(),
}))

describe('RouteInput', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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

  it('should render input correctly', () => {
    ;(useUpdateMarkers as jest.Mock).mockReturnValue({
      handleEnterPressed: jest.fn(),
    })

    render(
      <RouteInput
        points={points}
        onMarkerDragEnd={onMarkerDragEnd}
        onAddPoint={onAddPoint}
        mapRef={mapRef}
        isLoaded={true}
      />,
    )

    const inputElement = screen.getByPlaceholderText('Enter point name')
    expect(inputElement).toBeTruthy()
  })

  it('should call onAddPoint with new point when Enter is pressed', () => {
    const handleEnterPressedMock = jest.fn(e => {
      if (e.key === 'Enter') {
        const mapCenter = mapRef.current.getCenter()
        const newPoint: Point = {
          id: Date.now(),
          name: e.currentTarget.value,
          position: {
            lat: mapCenter.lat(),
            lng: mapCenter.lng(),
          },
        }
        onAddPoint(newPoint.position, newPoint.name)
      }
    })

    ;(useUpdateMarkers as jest.Mock).mockReturnValue({
      handleEnterPressed: handleEnterPressedMock,
    })

    render(
      <RouteInput
        points={points}
        onMarkerDragEnd={onMarkerDragEnd}
        onAddPoint={onAddPoint}
        mapRef={mapRef}
        isLoaded={true}
      />,
    )

    const inputElement = screen.getByPlaceholderText(
      'Enter point name',
    ) as HTMLInputElement
    fireEvent.change(inputElement, { target: { value: 'New Point' } })
    fireEvent.keyUp(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(handleEnterPressedMock).toHaveBeenCalled()
    expect(onAddPoint).toHaveBeenCalledWith({ lat: 52, lng: 32 }, 'New Point')
  })
})
