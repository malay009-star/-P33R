import React from "react";

const blogs = [
  {
    id: 1,
    image: "/assets/blogs/im1.png",
    title: "3 ways to highlight your career interests in an interview",
    category: "ABOUT US",
    date: "October 19, 2024",
    readTime: "14 min read",
  },
  {
    id: 2,
    image: "/assets/blogs/im2.png",
    title: "3 ways to highlight your career interests in an interview",
    category: "ABOUT US",
    date: "October 19, 2024",
    readTime: "14 min read",
  },
  {
    id: 3,
    image: "/assets/blogs/im3.png",
    title: "3 ways to highlight your career interests in an interview",
    category: "ABOUT US",
    date: "October 19, 2024",
    readTime: "14 min read",
  },
  {
    id: 4,
    image: "/assets/blogs/im4.png",
    title: "3 ways to highlight your career interests in an interview",
    category: "ABOUT US",
    date: "October 19, 2024",
    readTime: "14 min read",
  },
  {
    id: 5,
    image: "/assets/blogs/im5.png",
    title: "3 ways to highlight your career interests in an interview",
    category: "ABOUT US",
    date: "October 19, 2024",
    readTime: "14 min read",
  },
  {
    id: 6,
    image: "/assets/blogs/im6.png",
    title: "3 ways to highlight your career interests in an interview",
    category: "ABOUT US",
    date: "October 19, 2024",
    readTime: "14 min read",
  },
];

const BlogGrid = () => {
  return (
    <section className=" container bg-white font-[inter-r]">
      <div className=" mx-auto mb-5">
        <h2 className="text-3xl font-bold mb-8">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <a
              href="/blog-details"
              key={blog.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-pink-500 font-medium uppercase">
                  {blog.category}
                </p>
                <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
                <div className="text-sm text-gray-500 mt-3 flex justify-between">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
