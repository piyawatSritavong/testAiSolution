"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// สร้าง schema สำหรับตรวจสอบข้อมูล input
const PostSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }),
});

const HomePage = () => {
  const [posts, setPosts] = useState([]); // เก็บโพสต์ทั้งหมด

  // สร้างฟอร์มด้วย React Hook Form และ Zod
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
    },
  });

  // ฟังก์ชันดึงโพสต์ทั้งหมดจาก API
  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:8000/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data); // อัปเดต state ของ posts
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  // ฟังก์ชันเมื่อผู้ใช้ submit ฟอร์ม
  const onSubmit = async (data: z.infer<typeof PostSchema>) => {
    try {
      console.log('[DEBUG] data',data);
      const response = await fetch(`http://localhost:8000/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "user",
          content: data.content,
        }), // ส่งข้อมูล title และ content
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, newPost]); // เพิ่มโพสต์ใหม่
      form.reset(); // ล้างค่าในฟอร์ม
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  useEffect(() => {
    fetchPost(); // ดึงโพสต์เมื่อ component โหลดครั้งแรก
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mx-4">โพสของฉัน</h1>

      {/* แสดงรายการโพสต์ */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="p-4 border-b">
            <h2 className="text-xl">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>ไม่มีคอมเมนต์</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <UserCircle2 />
                </FormLabel>
                <FormControl>
                  <Input placeholder="แสงดความคิดเห็น" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant={'default'} type="submit">ส่ง</Button>
        </form>
      </Form>
    </div>
  );
};

export default HomePage;
