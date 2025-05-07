interface NotFoundDisplayProps {
  resourceName: string
  id?: string
}

export default function NotFoundDisplay({ resourceName, id }: NotFoundDisplayProps) {
  let message = `Could not find data for ${resourceName}.`
  if (id) {
    message = `Could not find data for ${resourceName} ID: ${id}.`
  }
  return (
    <div className='container mt-5'>
      <div className='alert alert-warning' role='alert'>
        <h2 className='alert-heading'>{`${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} Not Found`}</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}
