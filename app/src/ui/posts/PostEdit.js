import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {httpConfig} from "../../utils/http-config";
import * as Yup from "yup";
import {Formik} from "formik";

import {fetchAllPostsAndProfiles} from '../../store/posts'
import {PostEditFormContent} from './PostEditFormContent'
import { UseJwt } from '../../utils/jwt-helpers'

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const PostEdit = (props) => {

	// this is the post passed in via props
	const {post} = props;

	// controls show/hide modal window
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [status, setStatus] = useState(null);
	const dispatch = useDispatch()

	// grab json web token
	const jwt = UseJwt();

	const updatedPostContent = {
		postTitle: "",
		postContent: ""
	};

	const validator = Yup.object().shape({
		postTitle: Yup.string()
			.required("A title is required.")
			.max(64, "No titles longer than 64 characters."),
		postContent: Yup.string()
			.required("U gonna post something?")
			.max(2000, "2000 characters max per meow.")
	});

	const updatePost = (values, {setStatus}) => {
		const headers = {'authorization': jwt};
		httpConfig.put(`/apis/post/${post.postId}`, values, {
			headers: headers})
			.then(reply => {
				let {message, type} = reply;
				setStatus({message, type});
				if(reply.status === 200) {
					dispatch(fetchAllPostsAndProfiles())
					setTimeout(() => {
						{handleClose()}
					}, 750);
				}
				setStatus({message, type});
			});
	};

	return (
		<>
			<Button onClick={handleShow} variant="outline-secondary" size="sm" className="mr-2">
				<FontAwesomeIcon icon="pencil-alt"/>
			</Button>

			{/* Modal Window / Edit Post Form */}
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Editing Post #{post.postId}</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					{/* EDIT POST FORM */}
					<Formik
						initialValues={updatedPostContent}
						onSubmit={updatePost}
						validationSchema={validator}
					>
						{PostEditFormContent}
					</Formik>

				</Modal.Body>
			</Modal>
		</>
	)
};