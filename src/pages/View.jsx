import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import {  getVideo } from '../service/allapi'
import { useEffect } from 'react'

function View({serverRes}) {

const [allVideos,setallVideos]=useState([])
// const[allCategory,setallCategory]=useState([])
const [deleteStatus,setdeleteStatus]=useState(false)

// useEffect

useEffect(() => {
  getallVideos()
 
}, [serverRes,deleteStatus])

const handleDeleteStatus=(res)=>{
  setdeleteStatus(res)
}




// define a function for api call

const getallVideos=async()=>{
  // api call
const response= await getVideo()
// console.log(response.data);
setallVideos(response.data)

}
console.log(allVideos);

// define a function for api call for category

// const getallCategory=async()=>{
//   const res=await getCategory()
//   console.log(res.data);
//   setallCategory(res.data)
// }
// console.log('category',allCategory);




  return (
    <>
    <div className='border p-3 rounded m-4'>

<Row>
  {
    allVideos.map((video,i)=>
    <Col sm={12} md={6} key={i}>
    <VideoCard card={video}  handleDeleteStatus={ handleDeleteStatus}/>
</Col>
    )
  }
   
</Row>


    </div>
    </>
  )
}

export default View