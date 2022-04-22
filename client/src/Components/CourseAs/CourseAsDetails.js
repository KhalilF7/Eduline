import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useParams } from 'react-router-dom';
import { getChapterCId } from './CourseASApi';
export default function CourseAsDetails() {

  const { id,title } = useParams();
  //const user = (localStorage.getItem('user-info'));
  //const result = JSON.parse(user);
  //console.log(user.user);
  const [chps,setChps]=useState();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await getChapterCId(id);
      setChps(result);
    };
    fetchData();
  }, []);
  return (


    <section class="event_section layout_padding">
    <div class="container">
      <div class="heading_container">
        <h3>
       {title} 
        </h3>
      </div>
      <div class="event_container">
      {chps?.map((chp)=>(
        <>
        <div class="box">
          
          <div class="detail-box">
            <h4>
            {chp.Name} 
            </h4>
            <h6>
            {chp.Description} 
            </h6>
          </div>         
        </div>
        
           <div  className='player-wrapper'>
           <ReactPlayer
             className='player'
             url={chp.Lien}
             controls
             
             muted
           />
         </div>
         </>
       ))}
      </div>
      
    </div>
  </section>
  
  )
}
