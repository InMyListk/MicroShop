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

const FormSchema = z.object({
  username: z.string(),
  password: z.string(),
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
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const responce = await fetch("http://localhost:4000/api/v0/login", {
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
          <h1 className="text-xl font-semibold">Sign in</h1>
          <div>
            <Image src="/microshop.png" width={140} height={140} alt="" />
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <label htmlFor="" className="text-lg font-bold">
              username
            </label>
            <input
              type="text"
              className="border rounded w-full h-10 pl-3"
              {...register("username")}
            />
            <p className="text-red-500">{errors.username?.message}</p>
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
            <Link href="/register">Dosn't have account</Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
