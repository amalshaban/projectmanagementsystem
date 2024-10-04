import nodata from '../../../../assets/images/Envelope-br.png'
interface DeleteConfirmationProps {
  deleteItem: any; // Specify the type, e.g., 'string', 'number', or a more complex type if needed
}

export default function DeleteConfirmation({ deleteItem }:DeleteConfirmationProps) {
    return (
      <div className="modalbody text-center">
      <img src={nodata}/>
      <h5 className=''>Delete This {deleteItem} ?</h5>
      <span className="text-muted">are you sure you want to delete this item ? 
        if you are sure just click on delete it</span>
      </div>
    )
  }