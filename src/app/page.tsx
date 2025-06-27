'use client'

import { useEffect, useState } from "react";
import { getPosts } from "./api/api";
import Error from "./components/error"
import Posts from "./components/posts";
import Loading from "./components/loading";

export default function Home() {
  const [error, setError] = useState(null);
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPosts();
        setData(result);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#08f1e6] relative w-full p-6">
      {error ? (
        <Error error={error} /> 
      ) : data ? (
        <Posts posts={data} />
      ) : (
        <Loading/>
      )}
    </div>
  );
}
