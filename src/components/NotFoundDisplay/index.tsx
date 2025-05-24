interface NotFoundDisplayProps {
  resourceName: string
  id?: string
}

/**
 * Displays a warning message indicating that a specific resource could not be found.
 *
 * @param resourceName - The name of the resource that was not found.
 * @param id - (Optional) The identifier of the resource, if applicable.
 * @returns A React component rendering a warning alert with a not found message.
 *
 * @example
 * <NotFoundDisplay resourceName="venue" id="12345" />
 * // Renders: "Could not find data for venue ID: 12345."
 */
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
