import React, { FC, useCallback } from 'react'
import { RouteListProps } from './route-list.interfaces'
import { useDraggableRoute } from './services'

export const RouteList: FC<RouteListProps> = ({
  points,
  onDelete,
  onReorder,
}) => {
  const { draggedItemIndex, onDragStart, onDragEnter, ...restDraggableProps } =
    useDraggableRoute({ points, onReorder })

  const handleRemove = useCallback(
    (id: number) => () => {
      onDelete(id)
    },
    [onDelete],
  )

  return (
    <div style={{ maxHeight: 250, overflowY: 'auto' }}>
      <ul>
        {points.map((point, index) => (
          <li
            key={point.id}
            draggable
            onDragStart={onDragStart(index)}
            onDragEnter={onDragEnter(index)}
            {...restDraggableProps}
            style={{
              opacity: draggedItemIndex === index ? 0.5 : 1,
              border: '1px solid #ccc',
              marginBottom: '4px',
              padding: '8px',
              cursor: 'move',
            }}
          >
            {point.name}
            <button
              type="button"
              onClick={handleRemove(point.id)}
              style={{ marginLeft: '8px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
