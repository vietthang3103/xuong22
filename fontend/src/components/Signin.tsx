import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useLocalStorage } from './hooks/useStogare';

const signinSchema = Joi.object({
  // email: Joi.string().email().min(3).required(),
  password: Joi.string().min(6).required(),
})

const Signin = () => {
  const [, setUser] = useLocalStorage("user", {});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const { mutate } = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const { data } = await axios.post("http://localhost:8080/api/signin", formData);
      return data;
    },
    onSuccess: (data) => setUser(data),
    onError: (error) => console.log(error),
  });

  const onSubmit = (formData: { email: string; password: string }) => {
    mutate(formData);
  };
  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("email", { required: true, minLength: 3 })} placeholder='email'/>
        {errors.email && <p>{errors.email.message}</p>} 
        <input type="password" {...register("password", { required: true, minLength: 6 })} placeholder='password' />
        {errors.password && <p>{errors.password.message}</p>}
        <button>Đăng nhập</button>
      </form>
    </div>
  )
}

export default Signin