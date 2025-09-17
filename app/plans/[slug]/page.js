import React from 'react'
import db from '@/lib/db';
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
  try {
    const [rows] = await db.query('SELECT * FROM post WHERE id = ?', [slug]);
    if (rows && rows.length > 0) {
      return rows[0].collection;
    } else {
      return null;
    }
  } catch (error) {
    console.log("unable to call the fetch call...", error);
    throw new Error("Error while fetching slug data from db");
  }
}