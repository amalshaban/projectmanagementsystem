import nodata from '../../../../assets/images/Envelope-br.png'

export default function DeleteConfirmation({ deleteItem }) {
    return (
      <div className="modalbody text-center">
      <img src={nodata}/>
      <h5 className=''>Delete This {deleteItem} ?</h5>
      <span className="text-muted">are you sure you want to delete this item ? 
        if you are sure just click on delete it</span>
      </div>
    )
  }