import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Map } from '../map.component'
import { MapProps } from '../map.interfaces'
import { initialize } from '@googlemaps/jest-mocks'

jest.mock('../services', () => ({
  loadGoogleMapsApi: jest.fn().mockResolvedValue(undefined),
  useMap: jest.fn(),
}))

describe('Map component', () => {
  beforeAll(() => {
    initialize()
  })

  const defaultProps: MapProps = {
    points: [
      {
        position: { lat: 50, lng: 30 },
        id: 1,
        name: 'test',
      },
    ],
    mapRef: { current: null },
    setLoaded: jest.fn(),
    isLoaded: false,
  }

  it('renders loading message initially', () => {
    render(<Map {...defaultProps} />)
    expect(screen.getByText('Loading map...')).toBeTruthy()
  })

  it('renders map after loading', async () => {
    const props = { ...defaultProps, isLoaded: true }
    render(<Map {...props} />)

    await waitFor(() => {
      expect(screen.queryByText('Loading map...')).toBeFalsy()
    })

    expect(props.mapRef.current).not.toBeNull()
  })
})
