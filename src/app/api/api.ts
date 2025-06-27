import axios from "axios";

export const getPosts = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const resTodata = await axios.get("https://mini-blog-backend-4n3r.onrender.com/admin/posts");

    const mergedData = [...resTodata.data, ...response.data];

    return mergedData;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};

export const getAdminPosts = async () => {
  try {
    const resTodata = await axios.get("https://mini-blog-backend-4n3r.onrender.com/admin/posts");

    console.log(resTodata,"called");

    const mergedData = [...resTodata.data];


    return mergedData;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};

export const createPostByAdmin = async (post:any) => {
  try {
    const response = await axios.post("https://mini-blog-backend-4n3r.onrender.com/admin/posts", post);
    return response.data;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};


export const updatePostByAdmin = async (post:any, id:any) => {
  try {
    const response = await axios.put(`https://mini-blog-backend-4n3r.onrender.com/admin/posts/${id}`, post);
    return response.data;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};

export const deletePostByAdmin = async (id:any) => {
  try {
  
    await axios.delete(`https://mini-blog-backend-4n3r.onrender.com/admin/posts/${id}`);
    return true;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};