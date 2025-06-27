import { createSlice } from '@reduxjs/toolkit';

interface BlogState {
  title: string;
  body: string;
}

const initialState: BlogState = typeof window !== 'undefined' && localStorage.getItem('blog')
  ? JSON.parse(localStorage.getItem('blog') as string)
  : { title: '', body: '' };

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogPost: (state, action) => {
      state.title = action.payload.title;
      state.body = action.payload.body;
      if (typeof window !== 'undefined') {
        localStorage.setItem('blog', JSON.stringify(state));
      }
    },
    clearBlogPost: (state) => {
      state.title = '';
      state.body = '';
      if (typeof window !== 'undefined') {
        localStorage.removeItem('blog');
      }
    }
  }
});

export const { setBlogPost, clearBlogPost } = blogSlice.actions;
export default blogSlice.reducer;
