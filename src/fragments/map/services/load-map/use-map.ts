import { useEffect } from 'react'
import { loadGoogleMapsApi } from './load-map'
import { API_SECRET } from '../../../../globals'
import { UseMap } from './use-map.interfaces'

export const useMap: UseMap = ({ setLoaded }) => {
  useEffect(() => {
    const callMapLoader = async () => {
      try {
        await loadGoogleMapsApi(API_SECRET)
        setLoaded(true)
      } catch (error) {
        console.error('Error loading Google Maps API:', error)
      }
    }

    callMapLoader()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
