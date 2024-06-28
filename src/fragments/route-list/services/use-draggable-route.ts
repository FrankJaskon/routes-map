import React, { useCallback, useState } from 'react'
import { UseDraggableRoute } from './use-draggable-route.interfaces'

export const useDraggableRoute: UseDraggableRoute = ({ points, onReorder }) => {
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null)

  const handleDragStart = useCallback(
    (index: number) => () => {
      setDraggedItemIndex(index)
    },
    [],
  )

  const handleDragEnter = useCallback(
    (index: number) => (event: React.DragEvent) => {
      event.preventDefault()
      if (draggedItemIndex === null) return

      const newOrder = [...points]
      const [movedItem] = newOrder.splice(draggedItemIndex, 1)
      newOrder.splice(index, 0, movedItem)
      setDraggedItemIndex(index)
      onReorder(newOrder)
    },
    [draggedItemIndex, points, onReorder],
  )

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggedItemIndex(null)
  }, [])

  return {
    onDragStart: handleDragStart,
    onDragEnter: handleDragEnter,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    draggedItemIndex,
  }
}
