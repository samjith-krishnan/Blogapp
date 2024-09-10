import { useEffect,useState } from 'react'
import Header from '../components/Header'
import './Home.css'
import { Link, useNavigate } from 'react-router-dom'
import { getCustomers } from '../Api/allApi'
import { Button } from 'react-bootstrap'
import Bgcolor from './Bgcolor'
import { toast } from 'react-toastify'





function Home() {
  const navigate=useNavigate()
  const logOut=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    toast.success('logout success')
    navigate('/')


  }
  const [getlogUser,setLogUser]=useState([])
  

  const [customerData,setcustomerData]=useState([])

  useEffect(()=>{

    getUsers()

  },[])
  const uname=sessionStorage.getItem('username')




  const getUsers=()=>{
    const header={
      "Content-Type":"application/json",
      "Authorization":`token ${sessionStorage.getItem("token")}`
    }
      getCustomers(header).then(res=>{
      console.log(res.data);
      const customer=res.data
      setcustomerData(customer)

      
     })
  
   

  }

  return (
    
    
    <div>
      
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-3">

            <div className="profile d-flex gap-3" id="prof">
              <div className="profile-img">
              </div>
              <h5 className="d-flex align-items-center "><Link style={{ textDecoration: 'none', color: 'black' }} to={`/profile/${uname}`}>{uname}</Link></h5>
            </div>


            <div className="menu mt-5" id='prof'>
              <ul>
                <li className="menu-list">
                  <a href=""><i className="fa-solid fa-house me-3"></i>Home</a>
                </li>

                

                <li className="menu-list">
                <i className="fa-solid fa-heart me-2"></i> <Link to={'/user/liked'}>liked Post</Link>
                </li>

                <li className="menu-list">
                  <Bgcolor/>
                </li>

                <li className="menu-list">
                  <Button style={{
                    all:'unset'
                  }} onClick={logOut}><i className="fa-solid fa-gear me-3"></i>logout</Button>
                </li>
              </ul>
            </div>

          </div>


          <div className="blogbody col-9 mt-3">


            {
              customerData.length > 0 ?
              customerData.map((item,index)=>(

              

                <div className="container mt-4">
                <div className="last row" id='prof'>
                 
                  <div className="last-inner col-md-8">
                    <div className="blog-content" style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '350px',
                     
                    }}>
                      <h3 className='blogtitle'>{item.title}</h3>
                      <div className="blog-details p-3 d-flex align-items-center gap-1">
                        
                        <i className="fa-solid fa-heart fa-xl"></i>
                        <h6>{item.like_count}</h6>
                       
                      </div>
                    </div>
                  </div>
              
                
                  <div className="col-md-4">
                    <div className="user-profile p-3">
                      <div className="profile-picture" style={{
                        backgroundImage: `url(${item.author.dp})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100px',
                        width: '100px',
                        borderRadius: '50%',
                        margin: '0 auto'
                      }}>
                      </div>
                      <h4 className="text-center mt-3">{item.author.user}</h4>
                      <p>{item.author.bio}</p>
                      <div className='d-flex gap-3 ms-2'>
                        <Link to={`/post/${item.id}`} className="btn btn-outline-dark d-block mt-2">View blog</Link>
                        <Link to={`/other/${item.author.id}`} className="btn btn-outline-dark d-block mt-2">View author</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            ))
             :<h4>No customers</h4>
            }

          </div>


          
        </div>
      </div>

    </div>
  )
}

export default Home