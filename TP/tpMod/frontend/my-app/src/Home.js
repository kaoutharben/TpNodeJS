import React from 'react';
import { Link } from 'react-router-dom';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';
import './Home.css';
import Search from './Search';

function Home() {
    return (
        <div className="home">
            <div className="home__header">
                <div className='home__headerLeft'>
                <Link to='/upload'><img className='logo__header'  src={require('./logo.png')} alt=""/></Link> 
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

            <div className="home__body">
                <img src={require('./LIBGO.png')} alt=""/>
                <div className='home_search'>
                    <Search hiddenButons/>
                </div>
            </div>

            
        </div>
    )
}

export default Home
