import React,{useState} from 'react';
import'./Search.css';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Search({hiddenButons=false}) {
    const[{},dispatch]=useStateValue();
    const [input,setInput]=useState("");
    const history=useHistory();
    const search =(e)=>{
        e.preventDefault();
        console.log('You hit the search input : ',input)
        dispatch({
            type: actionTypes.SET_SEARCH_TERM,
            term :input
          });
        history.push('/search');
    }




    return (
        <form className="search">
            <div className='search__input'>
              <ImageSearchIcon className='search__icon'/>
            <input value={input} onChange={(e)=>setInput(e.target.value)}/>
            </div>
            {!hiddenButons ? (
                
            <div className='serach__buttons'>
                <Button type='submit' onClick={search} variant='outlined'>Google Search</Button>
                <Button variant='outlined'>I'm Feeling lucky</Button>
            </div>
            )
            :
            (<div className='serach__buttons'>
            <Button  className='hidden'
            type='submit' onClick={search} variant='outlined'>Google Search</Button>
            <Button   className='hidden' variant='outlined'>I'm Feeling lucky</Button>
        </div>)
        }
        </form>
    )
}

export default Search;
