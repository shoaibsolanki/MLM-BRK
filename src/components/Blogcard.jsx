import React from "react"
import { useNavigate } from "react-router-dom"

const BlogCard = ({ blog }) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate('/ViewBlog' , {state : {blog}})} className= "cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-200 dark:border-gray-700">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target
            if (target && target.src) {
              target.src = "/placeholder.svg?height=300&width=500"
            }
          }}
        />
      </div>
      <div className="p-5">
        <div className="space-y-1 mb-4">
          <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {blog.created}
          </p>
        </div>
        <div
          className="prose prose-sm dark:prose-invert mb-4 flex-grow"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
        {/* <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to={`/blog/${blog.id}`}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center"
          >
            Read more
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div> */}
      </div>
    </div>
  )
}

export default BlogCard
