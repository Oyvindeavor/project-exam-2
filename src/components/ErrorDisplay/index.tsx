interface ErrorDisplayProps {
  title: string
  message: string
}

export default function ErrorDisplay({ title, message }: ErrorDisplayProps) {
  return (
    <div className='container mt-5'>
      <div className='alert alert-danger' role='alert'>
        <h2 className='alert-heading'>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}
