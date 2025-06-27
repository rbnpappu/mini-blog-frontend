import axios from "axios";

export const getPosts = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const resTodata = await axios.get("http://localhost:5000/admin/posts");

    const mergedData = [...resTodata.data, ...response.data];

    return mergedData;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};

export const getAdminPosts = async () => {
  try {
    const resTodata = await axios.get("http://localhost:5000/admin/posts");

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
    const response = await axios.post("http://localhost:5000/admin/posts", post);
    return response.data;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};


export const updatePostByAdmin = async (post:any, id:any) => {
  try {
    const response = await axios.put(`http://localhost:5000/admin/posts/${id}`, post);
    return response.data;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};

export const deletePostByAdmin = async (id:any) => {
  try {
  
    await axios.delete(`http://localhost:5000/admin/posts/${id}`);
    return true;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};