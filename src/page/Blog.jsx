
import React, { useEffect, useState } from "react"
import BlogCard from "../components/Blogcard"
import DataService from '../services/requestApi'
const BlogList = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 2,
      saasId: "5",
      storeId: "50001",
      title: "Created Blog",
      image:
        "http://103.148.165.246:8088/test/api/v1/item/get-image-filename/32eda853-54b3-4710-9937-1fdac3e004e9BRK",
      created: "2025-05-09",
      description: "<p>Hello jee agay naya offer</p>",
    },
    {
      id: 3,
      saasId: "5",
      storeId: "50001",
      title: "New Blog ",
      image:
        "http://103.148.165.246:8088/test/api/v1/item/get-image-filename/afd40d24-3511-455d-b598-5ec97c30b1ecBRK",
      created: "2025-05-09",
      description: "<p><strong>This Is New Product Arrving </strong></p>",
    },
  ])

  const [isLoading, setIsLoading] = useState(false)

  // You can use this block when fetching from an API
  const GetAllBlogs = async ()=>{
    try {
      const response =  await DataService.BlogWithoutsaasid()
      setBlogs(response?.data?.data || [])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    GetAllBlogs()
  }, [])
  

  if (isLoading) {
    return <div className="text-center py-12">Loading blogs...</div>
  }

  if (blogs.length === 0) {
    return <div className="text-center py-12">No blogs found.</div>
  }

  return (
    <div className="m-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
