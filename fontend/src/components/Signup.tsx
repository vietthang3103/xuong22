import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

const Signup = () => {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const { mutate } = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const { data } = await axios.post("http://localhost:8080/api/signup", formData);
      return data;
    },
  });

  const onSubmit = (formData: { name: string ,email: string; password: string }) => {
    mutate(formData);
  };
  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} placeholder='name'/>
        <input type="text" {...register("email")} placeholder='email'/>
        <input type="text" {...register("password")} placeholder='password' />
        <button>Đăng ký</button>
      </form>
    </div>
  )
}

export default Signup;