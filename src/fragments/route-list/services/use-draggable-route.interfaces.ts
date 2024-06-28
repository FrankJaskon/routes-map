import { DragEvent } from 'react'
import { Point } from '../../../shared'

interface UseDraggableRouteProps {
  points: Point[]
  onReorder: (points: Point[]) => void
}

interface UseDraggableRouteReturnedType {
  onDragStart: (index: number) => () => void
  onDragEnter: (index: number) => (event: DragEvent) => void
  onDragOver: (event: DragEvent) => void
  onDragEnd: VoidFunction
  draggedItemIndex: number | null
}

export type UseDraggableRoute = (
  props: UseDraggableRouteProps,
) => UseDraggableRouteReturnedType
