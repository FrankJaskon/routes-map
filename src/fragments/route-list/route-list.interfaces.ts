import { Point } from '../../shared'

export interface RouteListProps {
  points: Point[]
  onDelete: (id: number) => void
  onReorder: (newPoints: Point[]) => void
}
