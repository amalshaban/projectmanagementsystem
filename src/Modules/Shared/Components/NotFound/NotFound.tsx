import bg from '../../../../assets/images/Envelope-br.png'
import logo from '../../../../assets/images/nav-logo.png'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="p-5 container">
    
          <img src={logo}/>
          <div className="row">
          <div className="col-lg-6 pt-5">
            <img className=" w-75" src={bg}/>
          </div>
          <div className="col-lg-6 pt-5">
          <h1 className='pt-5'>Oops.... </h1>
          <h2 className='not-found-text'>Page  not found </h2>
          <p className='fs-3'>This Page doesn’t exist or was removed!
          We suggest you  back to home.</p>
          <Link to='/dashboard' className='btn btn-success p-3'>Back to Home</Link>
          </div>
          </div>
         
   
      
    </div>
  )
}
