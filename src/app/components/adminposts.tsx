"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBlogPost } from "../redux/blogSlice";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createPostByAdmin,
  deletePostByAdmin,
  updatePostByAdmin,
  getAdminPosts,
} from "../api/api";
import Error from "../components/error";
import Loading from "../components/loading";

const AdminPosts: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [editId, setEditId] = useState<string | null>(null);

  const [error, setError] = useState(null);
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAdminPosts();
      setData(result);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenForm = (mode: "create" | "edit", post?: any, id?: string) => {
    setFormMode(mode);
    if (mode === "edit" && post && id) {
      setFormData({ title: post.title, body: post.body });
      setEditId(id);
    } else {
      setFormData({ title: "", body: "" });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    setFormData({ title: "", body: "" });
    setEditId(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async () => {
    try {
      if (formMode === "create") {
        const response = await createPostByAdmin(formData);
        if (response?.data) {
          alert("Successfully created post");
        }
      } else if (formMode === "edit" && editId) {
        const response = await updatePostByAdmin(formData, editId);
        if (response?.data) {
          alert("Successfully updated post");
        }
      }
      handleCloseForm();
      fetchData(); // refresh after submit
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const choosePost = (post: any) => {
    dispatch(setBlogPost({ title: post.title, body: post.body }));
    router.push(`/admin/posts/${post.id}`);
  };

  const handleDeletePost = async (id: string) => {
    try {
      const response = await deletePostByAdmin(id);
      if (response) {
        alert("Successfully deleted post");
        fetchData(); // refresh after delete
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="flex flex-col gap-[2rem] h-screen justify-center items-center">
      <Button
        variant="contained"
        onClick={() => handleOpenForm("create")}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.625rem",
        }}
      >
        <AddCommentIcon /> Add Post
      </Button>

      {loading && <Loading />}
      {!loading && error && <Error error={error} />}
      {!loading && !error && Array.isArray(data) && data.length === 0 && (
        <p className="text-white text-xl">
          No posts available. Add your first one!
        </p>
      )}

      {!loading &&
        !error &&
        Array.isArray(data) &&
        data.length > 0 &&
        data.map((post, index) => (
          <div
            key={index}
            className="flex flex-col p-[1rem] bg-[#fff] rounded-[1rem] text-[#201f1f] cursor-pointer gap-2"
            onClick={() => choosePost(post)}
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            }}
          >
            <h3 className="text-left text-[1.5rem] font-sans font-[900]">
              {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
            </h3>
            <p className="text-left text-[1rem] font-sans font-[400]">
              {post.body.length > 100
                ? `${post.body.slice(0, 100)}...`
                : post.body}
            </p>
            <div
              className="flex justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <DeleteIcon
                sx={{ color: "red", cursor: "pointer" }}
                onClick={() => handleDeletePost(post.id)}
              />
              <EditSquareIcon
                sx={{ color: "green", cursor: "pointer" }}
                onClick={() => handleOpenForm("edit", post, post.id)}
              />
            </div>
          </div>
        ))}

      <Dialog open={open} onClose={handleCloseForm}>
        <DialogTitle>
          {formMode === "create" ? "Add New Post" : "Edit Post"}
        </DialogTitle>
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
            {formMode === "create" ? "Create" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPosts;
