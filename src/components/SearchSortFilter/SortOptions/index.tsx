import React from 'react'

interface SortOptionsProps {
  initialSortField?: string
  initialSortOrder?: 'asc' | 'desc'
  onSortChange: (field: string, order: 'asc' | 'desc') => void
  sortFields: { value: string; label: string }[]
}

export default function SortOptions({
  initialSortField = '',
  initialSortOrder = 'desc',
  onSortChange,
  sortFields,
}: SortOptionsProps) {
  const [sortField, setSortField] = React.useState(initialSortField)
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>(initialSortOrder)

  const handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newField = event.target.value
    setSortField(newField)
    onSortChange(newField, sortOrder)
  }

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = event.target.value as 'asc' | 'desc'
    setSortOrder(newOrder)
    onSortChange(sortField, newOrder)
  }

  React.useEffect(() => {
    setSortField(initialSortField)
  }, [initialSortField])

  React.useEffect(() => {
    setSortOrder(initialSortOrder)
  }, [initialSortOrder])

  return (
    <div className='d-flex flex-column flex-sm-row gap-2'>
      <select
        className='form-select form-select-lg'
        aria-label='Sort by field'
        value={sortField}
        onChange={handleSortFieldChange}
      >
        <option value=''>Sort by...</option>
        {sortFields.map((field) => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>
      <select
        className='form-select form-select-lg'
        aria-label='Sort order'
        value={sortOrder}
        onChange={handleSortOrderChange}
        disabled={!sortField}
      >
        <option value='desc'>Descending</option>
        <option value='asc'>Ascending</option>
      </select>
    </div>
  )
}
