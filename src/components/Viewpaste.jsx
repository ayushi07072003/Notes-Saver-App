import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast'; // Optional: Add toast if using validation feedback

export default function Viewpaste() {
  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("final Paste",paste);
  return (
    <div className='flex flex-col items-center p-4'>
      <div className='w-[500px] flex flex-row justify-evenly gap-2'>
        <input
          className='p-2 rounded-2xl mt-2 flex-1'
          type='text'
          placeholder='Enter title here'
          disabled
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
        />

      </div>

      <div className='mt-8 w-full max-w-[900px]'>
        <textarea
          className='w-full bg-slate-300 rounded-2xl mt-4 p-4'
          value={paste.content}
          placeholder='Enter content here'
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}
