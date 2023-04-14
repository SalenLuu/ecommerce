import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import defaultValues from "../utils/defaultValues";

const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    console.log(data);
    const URL = "https://e-commerce-api-v2.academlo.tech/api/v1/users";
    axios
      .post(URL, data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    reset(defaultValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="firstName">First name</label>
          <input {...register("firstName")} type="text" id="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <input {...register("lastName")} type="text" id="lastName" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email")} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input {...register("password")} type="password" id="password" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input {...register("phone")} type="number" id="phone" />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
