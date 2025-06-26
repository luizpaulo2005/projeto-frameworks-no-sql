import { PostDetails } from './post-details'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <PostDetails postId={id} />
}

export default Page
