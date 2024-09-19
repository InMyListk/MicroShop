"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FormSchema = z
  .object({
    username: z.string(),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string().min(8, "Password must be at least 8 character(s)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.username.trim().split(/\s+/).length >= 3, {
    message: "Username must be triple",
    path: ["username"],
  });

export const From = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const responce = await fetch("http://localhost:4000/api/v0/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await responce.json();
    console.log(newData);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <Card className="max-w-[400px] mx-auto sm:my-10">
        <CardHeader className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-semibold">Create new Account</h1>
          <div>
            <Image src="/microshop.png" width={140} height={140} alt="" />
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <label htmlFor="" className="text-lg font-bold">
              Your name
            </label>
            <input
              type="text"
              className="border rounded w-full h-10 pl-3"
              {...register("username", { required: true })}
            />
            <p className="text-red-500">{errors.username?.message}</p>
          </div>
          <div>
            <label htmlFor="" className="text-lg font-bold">
              Email
            </label>
            <input
              type="text"
              className="border rounded w-full h-10 pl-3"
              {...register("email")}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div>
            <label htmlFor="" className="text-lg font-bold">
              Password
            </label>
            <input
              type="password"
              className="border rounded w-full h-10 pl-3"
              {...register("password")}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <div>
            <label htmlFor="" className="text-lg font-bold">
              Re-enter password
            </label>
            <input
              type="password"
              className="border rounded w-full h-10 pl-3"
              {...register("confirmPassword")}
            />
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          </div>
          <div>
            <input
              type="submit"
              className="w-full text-lg bg-blue-500 h-10 text-white rounded cursor-pointer hover:bg-blue-500/90"
              value="Continue"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            className="hover:text-blue-500 mx-auto font-bold text-md"
          >
            <Link href="/login">Already have account</Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
