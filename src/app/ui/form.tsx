"use client";

import { addUser } from "@/actions/actions";
import { Inputs } from "@/lib/types";
import { userSchema } from "@/lib/schema";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Form() {
  const [data, setData] = useState<Inputs>();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  });

  const handleForm: SubmitHandler<Inputs> = async (data) => {
    const result = await addUser(data);

    if (!result) {
      console.log("An error occurred");
      return;
    }

    if (result.error) {
      console.log(result.error);
      return;
    }

    reset();
    setData(result.data);
    console.log("User successfully added:", result.data);

    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  return (
    <section className="flex min-h-full flex-col justify-center sm:w-full sm:max-w-sm w-11/12 mx-auto">
      <div>
        <h1 className="text-center font-bold mt-10 text-2xl/9 text-gray-900">
          Sign up
        </h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
          <div>
            <label className="block text-sm/6 font-medium">Name</label>
            <div className="mt-2">
              <input
                placeholder="Name"
                {...register("name")}
                className="block w-full rounded-md px-3 py-1.5 text-base bg-white border border-gray-300 placeholder:text-gray-400 focus:-outline-offset-0 focus:outline-gray-400 sm:text-sm/6"
              />
            </div>
            {errors.name?.message && (
              <p className="text-red-700 mt-2">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm/6 font-medium">Email</label>
            <div className="mt-2">
              <input
                placeholder="Email"
                {...register("email")}
                className="block w-full rounded-md px-3 py-1.5 text-base bg-white border border-gray-300 placeholder:text-gray-400 focus:-outline-offset-0 focus:outline-gray-400 sm:text-sm/6"
              />
            </div>
            {errors.email?.message && (
              <p className="text-red-700 mt-2">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm/6 font-medium">Password</label>
            <div className="mt-2">
              <input
                placeholder="Password"
                {...register("password")}
                type="password"
                className="block w-full rounded-md px-3 py-1.5 text-base bg-white border border-gray-300 placeholder:text-gray-400 focus:-outline-offset-0 focus:outline-gray-400 sm:text-sm/6"
              />
            </div>
            {errors.password?.message && (
              <p className="text-red-700 mt-2">{errors.password.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-black text-white px-3 py-1.5 text-sm/6 font-semibold shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex justify-center bg-black bg-opacity-40">
          <div className="bg-white p-4 rounded-md shadow-md mt-32 h-[150px] sm:w-full sm:max-w-sm flex items-center justify-center">
            <p className="text-center font-semibold">
              Form successfully submitted!
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
