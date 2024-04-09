import { Slot } from './Slot'
export const Column = ({ children, updateBoard, index }) => {
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div className='column' onClick={handleClick}>
      {
      children.map((slot, index) =>
        <Slot key={index}>
          {slot}
        </Slot>
      )
      }
    </div>
  )
}
