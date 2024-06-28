import React from 'react'
import { render, screen } from '@testing-library/react'
import { RoutesMap } from '../routes-map.component'
import { initialize } from '@googlemaps/jest-mocks'
import '@testing-library/jest-dom'
import { usePoints } from '../services'

jest.mock('../services', () => ({
  usePoints: jest.fn(),
}))

const pointsMock = [
  { id: 1, name: 'Point 1', position: { lat: 50, lng: 30 } },
  { id: 2, name: 'Point 2', position: { lat: 51, lng: 31 } },
]

const usePointsMock = {
  points: pointsMock,
  handleMarkerDragEnd: jest.fn(),
  handleDeletePoint: jest.fn(),
  handleAddPoint: jest.fn(),
  handleReorderPoints: jest.fn(),
}

describe('RoutesMap', () => {
  beforeAll(() => {
    initialize()
    ;(usePoints as jest.Mock).mockReturnValue(usePointsMock)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display routes list', async () => {
    render(<RoutesMap />)

    const pointElements = screen.getAllByRole('listitem') as HTMLInputElement[]

    pointElements.forEach((pointElement, index) => {
      expect(pointElement).toHaveTextContent(pointsMock[index].name)
    })
  })

  it('should display route input', async () => {
    render(<RoutesMap />)

    const inputElement = screen.getByPlaceholderText(
      'Enter point name',
    ) as HTMLInputElement

    expect(inputElement).toBeTruthy()
  })
  it('should display map loader', async () => {
    render(<RoutesMap />)

    const mapLoaderElement = screen.getByText(
      'Loading map...',
    ) as HTMLInputElement

    expect(mapLoaderElement).toBeTruthy()
  })
})
