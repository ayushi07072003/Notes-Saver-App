import React , {useState}from 'react';
import '../index.css'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast'; // Optional: Add toast if using validation feedback

export default function Pastes() {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm,setSearchTerm]=useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }
  function handleShare(paste) {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url: window.location.href, // or a specific URL if you have one for each paste
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing not supported in this browser.');
    }
  }
  
  return (
    <div className='flex flex-col w-[510px] border p-2 '>
      <input 
      className='w-11/12 p-2 rounded-2xl m-5'
      type='search'
      placeholder='search here'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col items-center mt-5 gap-5'>
        {
          filteredData.length > 0 && filteredData.map((paste) => {
            return (
              <div key={paste?._id} className='flex flex-col items-center w-11/12 border rounded-sm pt-3'>
                <div className='font-bold'>{paste.title}</div>
                <div className='p-4'>
                  {paste.content.length > 100
                    ? paste.content.slice(0, 100) + '...'
                    : paste.content}
                </div>

                <div className='flex flex-row w-11/12 text-slate-500 border my-2 gap-4 place-content-evenly'>
                  <button>
                  <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                  <button onClick={()=>handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button onClick={()=>{
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to clipboard")
                  }}>
                    Copy
                  </button>
                  <button onClick={() => handleShare(paste)}>Share</button>
                </div>
                <div className='text-xs'>{paste.createdAt}</div>
                </div>

              )
            }
          )
        }
      </div>
    </div>
  )
}
