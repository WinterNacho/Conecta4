export const Turn = ({ children, isSelected }) => {
  const className = `turn ${isSelected ? 'is-selected' : ''}`
  return (
    <div className={className}>
      {children}
    </div>
  )
}
