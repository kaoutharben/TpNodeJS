import { Link } from 'react-router-dom';
import React from 'react'
import Search from './Search';
import './SearchPage.css';
import { useStateValue } from './StateProvider';
import ImageIcon from '@material-ui/icons/Image';

function SearchPage() {
    const [{term},dispatch]=useStateValue();
    return (
        <div className='searchPage'>
            <div className='searchPage__header'>
                <div className='headerSearch'>
            <Link to='/'>
                <img className='searchPage__logo'
                src={require('./logo.png')}
                alt='logo'/>
             </Link>
              <div className='searchPage__headerBody'>
                  <Search hiddenButons/>
             </div>
              </div>
              <div  className='searchPage__option'>
                 <div className=' searchPage__image'>
                
                     <Link to='/search'>
                     <ImageIcon/>
                     <div className='text'> Images</div> 
                   
                     </Link>
                   
                 </div>
                  
              </div> 
             </div>
         <div className='searchPage_result'></div>
         </div>
    )
}

export default SearchPage
