import React from 'react';
import{Link} from 'react-router-dom';
import './Show.css';
import ImageIcon from '@material-ui/icons/Image';
import AttachFileIcon from '@material-ui/icons/AttachFile';
function Show() {
    return (
        <div  className='show'>
            <div className='head'>          
                  <div className="home__header">
                <div className='home__headerLeft'>
                <Link to='/'><img className='logo__header'  src={require('./logo.png')} alt=""/></Link> 
                </div>
                <div className='home__headerRight'>
                <Link to ='/upload'>
                <div className='func'> 
                    <AttachFileIcon/>
                  <span>Upload</span>
                </div>
                </Link>
                <Link to ='/show'>
                <div className='func'>   
                    <ImageIcon/>
                    <span> Show</span>
                </div>
                </Link>
                <Link to ='/logIn' ><button className='butt__header'>Log In</button></Link>
                </div>
                
            </div>
            <div  className='searchPage__option'>
                 <div className=' searchPage__image'>
                
                     <Link to='/show'>
                     <ImageIcon/>
                     <div className='text'> User's Images</div> 
                   
                     </Link>
                   
                 </div>
                  
              </div> 
              </div>

         <div className='searchPage_result'></div>
         </div>
       
    )   
}

export default Show;
