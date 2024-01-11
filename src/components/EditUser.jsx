import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import AxiosService from "./utils/Apiservice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function EditUser() {
  let params = useParams(); 

 let [books,setBook] = useState({
  title: "",
  author: "",
  number: "",
  date: "",
  dob: "",
  description: "",
},)
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: books,
    validationSchema: Yup.object({
      title: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required(" Required"),
      author: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      number: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      date: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      dob: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      description: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    enableReinitialize:true,
    onSubmit: async (values) => {
      let { id } = params;
      values.id=id
      try {
        let res = await AxiosService.put(`/books/${id}`, values);
        if (res.status === 200) {
          toast.success(" Data Edited Successfully", {
            position: "top-center",

            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/");
        }
      } catch (error) {}
    },
  });

  const getUserData = async () => {
    let { id } = params;
    
    try {
      let res = await AxiosService.get(`/books/${id}`);
      if (res.status === 200) {
        setBook({
            title: res.data.title,
            author: res.data.author,
            number: res.data.number,
            date: res.data.date,
            dob: res.data.dob,
            description: res.data.description,
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Edit User</h1>
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="Book Title"
              />
              {formik.touched.title && formik.errors.title ? (
                <div style={{ color: "red" }}>{formik.errors.title}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author"
                id="author"
                name="author"
                onChange={formik.handleChange}
                value={formik.values.author}
                onBlur={formik.handleBlur}
              />
              {formik.touched.author && formik.errors.author ? (
                <div style={{ color: "red" }}>{formik.errors.author}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ISBN Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Isbn"
                id="number"
                name="number"
                onChange={formik.handleChange}
                value={formik.values.number}
                onBlur={formik.handleBlur}
              />
              {formik.touched.number && formik.errors.number ? (
                <div style={{ color: "red" }}>{formik.errors.number}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Published Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Date"
                id="date"
                name="date"
                onChange={formik.handleChange}
                value={formik.values.date}
                onBlur={formik.handleBlur}
              />
              {formik.touched.date && formik.errors.date ? (
                <div style={{ color: "red" }}>{formik.errors.date}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author Dob"
                id="dob"
                name="dob"
                onChange={formik.handleChange}
                value={formik.values.dob}
                onBlur={formik.handleBlur}
              />
              {formik.touched.dob && formik.errors.dob ? (
                <div style={{ color: "red" }}>{formik.errors.dob}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dscription</Form.Label>
              <Form.Control
                type="text"
                placeholder="details"
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description ? (
                <div style={{ color: "red" }}>{formik.errors.description}</div>
              ) : null}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
