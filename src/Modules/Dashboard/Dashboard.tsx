
export default function Dashboard() {
<<<<<<< HEAD

  let navigate = useNavigate();
  let handleClick=()=>{
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div>Dashboard
      <button className='btn btn-success p-4' onClick={handleClick}>LOGOUT</button>
      
=======
  
  return (
    <div>
      <h1>Dashboard</h1>
>>>>>>> 1b18e14d8901a49c89ab0c953cce06940097eb36
    </div>
  )
}
