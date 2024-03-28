import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';

function View() {
  const { id } = useParams()
  const [valueDb,setValueDb]=useState("")
  const [value, setValue] = useState(valueDb?.description);

  const db = getFirestore()

const changeDoc=(change)=>{
  setValue(change)
}

  const fetchViewDoc = async (id) => {
    const viewDoc = await getDoc(doc(db, "documents", id))
    console.log(viewDoc.data());
    setValueDb(viewDoc.data())
    setValue(viewDoc.data().description)
    console.log(viewDoc.data().description);
  }
 
  const updateDes=async()=>{
    await updateDoc(doc(db, "documents", id),{
      description:value
    })
  }

  useEffect(() => {
    fetchViewDoc(id)
    updateDes()
  }, [value])
  // useEffect(()=>{
   
  // },[value])

  return (
    <>
      <div className="container mt-4 ">
        <h1 className='text-center mb-3'>{valueDb?.title}</h1>
        <ReactQuill style={{ height: "300px" }} theme="snow" value={value} onChange={setValue} />
      </div>
    </>
  )
}

export default View