import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { Point } from '../../shared'

export interface MapProps {
  mapRef: MutableRefObject<google.maps.Map | null>
  points: Point[]
  setLoaded: Dispatch<SetStateAction<boolean>>
  isLoaded: boolean
}
