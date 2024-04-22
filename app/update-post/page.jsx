'use client';

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPost = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const postId = searchParams.get('id');
    console.log('postId:', postId);
    

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        content: '',
        tag: ''
    });

    useEffect(() => {
        const getPostDetails = async () => {
            const response = await fetch(`/api/post/${postId}`);
            const data = await response.json();

            setPost({
                content: data.content,
                tag: data.tag
            })
        }
        if(postId) getPostDetails()
    }, [postId]);

    const updatePost = async (e) => {
      e.preventDefault();
      setSubmitting(true);

      if(!postId) return alert('Post ID not found!')

      try {
        const response = await fetch(`/api/post/${postId}`, {
            method: "PATCH",
            body: JSON.stringify({
              content: post.content,
              tag: post.tag,
            }),
        });
  
        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
  

    //   try {
    //     const response = await fetch(`/api/post/${postId}`, {
    //       method: 'PATCH',
    //       body: JSON.stringify({
    //         content: post.content,
    //         tag: post.tag
    //       }),
    //     });

    //     if(response.ok) {
    //       router.push('/')
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setSubmitting(false)
    //   }
    }

  return (
    <div>
      <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        setSubmitting={setSubmitting}
        handleSubmit={updatePost}
      />
    </div>
  )
}

export default EditPost
