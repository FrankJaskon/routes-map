import { renderHook, act } from '@testing-library/react-hooks'
import { useMap } from './use-map'
import { loadGoogleMapsApi } from './load-map'

jest.mock('./load-map', () => ({
  loadGoogleMapsApi: jest.fn(),
}))

describe('useMap Hook', () => {
  it('calls loadGoogleMapsApi and sets loaded state', async () => {
    const setLoadedMock = jest.fn()
    const loadGoogleMapsApiMock = loadGoogleMapsApi as jest.Mock

    loadGoogleMapsApiMock.mockResolvedValueOnce(undefined)

    await act(async () => {
      renderHook(() => useMap({ setLoaded: setLoadedMock }))
    })

    expect(setLoadedMock).toHaveBeenCalledWith(true)
  })

  it('handles loadGoogleMapsApi error', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    const setLoadedMock = jest.fn()
    const loadGoogleMapsApiMock = loadGoogleMapsApi as jest.Mock
    const error = new Error('Test error')

    loadGoogleMapsApiMock.mockRejectedValueOnce(error)

    await act(async () => {
      renderHook(() => useMap({ setLoaded: setLoadedMock }))
    })

    expect(setLoadedMock).not.toHaveBeenCalled()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error loading Google Maps API:',
      error,
    )

    consoleErrorSpy.mockRestore()
  })
})
