import { loadGoogleMapsApi } from './load-map'

describe('loadGoogleMapsApi', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should resolve when script loads successfully', async () => {
    const appendChildMock = jest
      .spyOn(document.head, 'appendChild')
      .mockImplementation((script: Node) => {
        // @ts-ignore
        script.onload()

        return {} as Node
      })

    await expect(loadGoogleMapsApi('test-api-key')).resolves.toBeUndefined()

    expect(appendChildMock).toHaveBeenCalled()
  })

  it('should reject when script fails to load', async () => {
    const appendChildMock = jest
      .spyOn(document.head, 'appendChild')
      .mockImplementation((script: Node) => {
        // @ts-ignore
        script.onerror(new Error('Script load error'))

        return {} as Node
      })

    await expect(loadGoogleMapsApi('test-api-key')).rejects.toThrow(
      'Script load error',
    )

    expect(appendChildMock).toHaveBeenCalled()
  })

  it('should reject when no API key is provided', async () => {
    await expect(loadGoogleMapsApi()).rejects.toThrow('No API key provided.')
  })

  it('should resolve if script is already loaded', async () => {
    document.body.innerHTML = '<script id="google-maps-script"></script>'

    await expect(loadGoogleMapsApi('test-api-key')).resolves.toBeUndefined()
  })
})
