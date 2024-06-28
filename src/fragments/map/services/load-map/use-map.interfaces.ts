import { Dispatch, SetStateAction } from 'react'

interface UseMapProps {
  setLoaded: Dispatch<SetStateAction<boolean>>
}

export type UseMap = (props: UseMapProps) => void
