'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { clearBlogPost } from '@/app/redux/blogSlice';

const PostPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  const post = useSelector((state: RootState) => state.blog);

  const backToDashboard = () => {
    router.push('/');
    dispatch(clearBlogPost());
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 765);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className='h-screen bg-[#08f1e6] relative w-full p-6 overflow-auto'>
      <div className="flex flex-col justify-between items-center bg-[#fff] p-8 rounded-[1rem] gap-6" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}>
        <h3 className={`text-left font-sans font-[900] text-[#3e3e3e] ${isMobile ? 'text-[2rem]' : 'text-[3rem]'}`}>
          {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
        </h3>
        <p className={`text-left font-sans font-[400] text-[#3e3e3e] ${isMobile ? 'text-[2.6rem]' : 'text-[2rem]'}`}>
          {post.body}
        </p>
        <button
          className="bg-[#0985eb] w-[100px] h-[40px] text-white p-2 text-sm rounded-[12px] cursor-pointer"
          onClick={backToDashboard}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PostPage;
