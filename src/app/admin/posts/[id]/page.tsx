'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { setBlogPost, clearBlogPost } from '../../../redux/blogSlice';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import { updatePostByAdmin, deletePostByAdmin } from '../../../api/api';

const PostPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const post = useSelector((state: RootState) => state.blog);
  console.log(post, "post data");

  const dispatch = useDispatch();


  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [editId, setEditId] = useState<string | null>(null);

  const handleOpenForm = (mode: 'create' | 'edit', post?: any, id?: string) => {
    setFormMode(mode);
    if (mode === 'edit' && post && id) {
      setFormData({ title: post.title, body: post.body });
      dispatch(setBlogPost({ title: post.title, body: post.body }));
      setEditId(id);
    } else {
      setFormData({ title: '', body: '' });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    setFormData({ title: '', body: '' });
    setEditId(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async () => {
    try {
      if (formMode === 'edit' && editId) {
        const response = await updatePostByAdmin(formData, editId);
        if (response?.data) {
          alert('Successfully updated post');
        }
      }
      handleCloseForm();
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const response = await deletePostByAdmin(id);
      if (response) {
        alert('Successfully deleted post');
        router.push('/admin');
      }
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const backToDashboard = () => {
    router.push('/admin');
    dispatch(clearBlogPost());
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 765);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
  <>
    <div className='h-screen overflow-auto bg-[#08f1e6] relative w-full p-6'>
      <div
        className="flex flex-col justify-between items-center bg-[#fff] p-8 rounded-[1rem] gap-6"
        style={{
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
        }}
      >
        <h3 className={`text-left font-sans font-[900] text-[#3e3e3e] ${isMobile ? 'text-[2rem]' : 'text-[3rem]'}`}>
          {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
        </h3>
        <p
          className={`w-inherit text-left font-sans font-[400] text-[#3e3e3e]  break-words whitespace-pre-line ${isMobile ? 'text-[1.8rem] break-words' : 'text-[2rem]'}`}
          style={{
            width: "inherit",
            wordBreak: "break-word",
            whiteSpace: "pre-line"
          }}
        >
          {post.body}
        </p>
        <button
          className="bg-[#0985eb] w-[100px] h-[40px] text-white p-2 text-sm rounded-[12px] cursor-pointer"
          onClick={backToDashboard}
        >
          Back
        </button>
        <div className="flex justify-between" onClick={(e) => e.stopPropagation()}>
          <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDeletePost(id)} />
          <EditSquareIcon sx={{ color: 'green', cursor: 'pointer' }} onClick={() => handleOpenForm('edit', post, id)} />
        </div>
      </div>

      <Dialog open={open} onClose={handleCloseForm}>
        <DialogTitle>{formMode === 'create' ? 'Add New Post' : 'Edit Post'}</DialogTitle>
        <DialogContent className="flex flex-col gap-4 py-2">
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={formData.title}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Body"
            name="body"
            multiline
            rows={4}
            fullWidth
            value={formData.body}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            {formMode === 'create' ? 'Create' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  </>
  );
};

export default PostPage;
