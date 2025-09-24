import React from 'react'
import Post from '@/model/Post';
import dbConnect from '@/lib/db';
import PlainWrapper from '@/components/PlainWrapper';


export default async function Page({ params }) {
  const { slug } = await params;
  const planData = await fetchSinglePlan(slug);
  console.log("planData is", planData);
  return (
    <>
<PlainWrapper plainData={planData}/>
    </>
  );
}

const fetchSinglePlan = async (slug) => {
  await dbConnect()
  try {
    const response = await Post.findById(slug)
    if(response){
      return response.post
    }
  } catch (error) {
    console.log("unable to call the fetch call...", error);
    throw new Error("Error while fetching slug data from db");
  }
}