import Post from "./Post.jsx";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {

	const getPostEndpoint = () => {
		switch (feedType) {
			case "forYou":
				return "https://social-media-thzy.onrender.com/api/v1/post/all";
			case "following":
				return "https://social-media-thzy.onrender.com/api/v1/post/following";
			case "likes":
				return `https://social-media-thzy.onrender.com/api/v1/post/likes/${userId}`;
			case "posts":
				return `https://social-media-thzy.onrender.com/api/v1/user/${username}`;
			default:
				return "https://social-media-thzy.onrender.com/api/v1/post/all";
		}
	}

	const POST_ENDPOINT = getPostEndpoint();

	const { data:posts , isLoading, refetch, isRefetching } = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			try {
				const res = await fetch(POST_ENDPOINT);
				const data = await res.json();
				
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				return data;
			} catch (error) {
				throw new Error(error);
			}
		}
	});

	useEffect(() => {
		refetch();
	}, [feedType, refetch])

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;