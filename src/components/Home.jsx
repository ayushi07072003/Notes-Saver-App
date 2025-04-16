import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast'; // Optional: Add toast if using validation feedback

export default function Home() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state)=>state.paste.pastes);


  useEffect(() => {
    if (!pasteId) return;
  
    const paste = allPaste.find((p) => p._id === pasteId);
    if (paste) {
      setTitle(paste.title);
      setValue(paste.content);
    } else {
      // Optional: handle missing paste gracefully
      setTitle('');
      setValue('');
      console.warn("Paste not found for pasteId:", pasteId);
    }
  }, [pasteId, allPaste]);
  
  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }

    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <div className='w-[500px] flex flex-row justify-evenly gap-2 '>
        <input
          className=' p-2 border rounded-2xl flex-1'
          type='text'
          placeholder='Enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="rounded-2xl px-3 text-slate-400 border hover:text-slate-800 transition"
          onClick={createPaste}
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className='mt-8 w-full max-w-[900px]'>
        <textarea
          className='w-full bg-slate-300 rounded-2xl mt-4 p-4'
          value={value}
          placeholder='Enter content here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
}
