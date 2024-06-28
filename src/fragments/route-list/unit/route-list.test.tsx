import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RouteList } from '../route-list.component'
import { Point } from '../../../shared'
import { useDraggableRoute } from '../services'

jest.mock('../services', () => ({
  useDraggableRoute: jest.fn(),
}))

describe('RouteList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useDraggableRoute as jest.Mock).mockReturnValue({
      draggedItemIndex: null,
      onDragStart: jest.fn(),
      onDragEnter: jest.fn(),
      onDragOver: jest.fn(),
      onDragEnd: jest.fn(),
    })
  })

  const points: Point[] = [
    { id: 1, name: 'Point 1', position: { lat: 50, lng: 30 } },
    { id: 2, name: 'Point 2', position: { lat: 51, lng: 31 } },
    { id: 3, name: 'Point 3', position: { lat: 52, lng: 32 } },
  ]

  const onDelete = jest.fn()
  const onReorder = jest.fn()

  it('should render points correctly', () => {
    render(
      <RouteList points={points} onDelete={onDelete} onReorder={onReorder} />,
    )

    points.forEach(point => {
      expect(screen.getByText(point.name)).toBeTruthy()
    })
  })

  it('should call onDelete when delete button is clicked', () => {
    render(
      <RouteList points={points} onDelete={onDelete} onReorder={onReorder} />,
    )

    points.forEach((point, index) => {
      const deleteButton = screen.getAllByText('Delete', { selector: 'button' })
      fireEvent.click(deleteButton[index])
      expect(onDelete).toHaveBeenCalledWith(point.id)
    })
  })
})
