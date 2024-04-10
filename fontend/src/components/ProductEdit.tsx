import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { IProduct } from '../interfaces/product';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// const productSchema = Joi.object({
//   name: Joi.string().required().min(3),
//   price: Joi.number().positive().min(3),
//   image: Joi.string(),
//   description: Joi.string(),
// });

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['PRODUCTS'],
    queryFn: async() => {
      const { data } = await axios.get(`http://localhost:8080/api/products/${id}`);
      reset(data.product);
      return data.product;
    },
  });
  const { register, handleSubmit, formState: {errors}, reset } = useForm({
    // resolver: joiResolver(productSchema),
    // defaultValues: {
    //   name: data.name,
    //   price: data.price,
    //   image: data.image,
    //   description: data.description,
    // },
  });

  const { mutate } = useMutation({
    mutationFn: async(product: IProduct) => {
      console.log('product', product);
      const { data } = await axios.put(`http://localhost:8080/api/products/${product._id}`, product);
      return data.product;
    },
    onSuccess: () => {
      alert("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries({
        queryKey: ["PRODUCTS"],
      })
    }
  })
  const onSubmit = (product: IProduct) => {
    console.log('product', product);
    mutate(product);
    navigate(`/admin`);
  }
  return (
    <div className='container'>
        <h2 className='mt-4'>Cập nhật sản phẩm</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3'>
            <label htmlFor="name" className='form-label'>Tên sản phẩm</label>
            <input type="text" className='form-control' placeholder='Tên sản phẩm' {...register('name', {required: true, minLength: 3})}/>
            {errors?.name?.message && ( <span className='text-danger'>{errors?.name?.message}</span>)}
          </div>

          <div className='mb-3'>
            <label htmlFor="price" className='form-label'>Giá sản phẩm</label>
            <input type="number" className='form-control' placeholder='Giá sản phẩm' {...register('price', {required: true})}/>
            {errors?.price?.message && ( <span className='text-danger'>{errors?.price?.message}</span>)}
          </div>

          <div className='mb-3'>
            <label htmlFor="image" className='form-label'>Ảnh sản phẩm</label>
            <input type="text" className='form-control' placeholder='Ảnh sản phẩm' {...register('image')}/>
          </div>

          <div className='mb-3'>
            <label htmlFor="name" className='form-label'>Mô tả sản phẩm</label>
            <textarea id="" cols={30} rows={10} className='form-control' {...register('description')}></textarea>
            {errors?.description?.message && ( <span className='text-danger'>{errors?.description?.message}</span>)}          </div>

          <button className='btn btn-primary'>Cập nhật</button>
        </form>
    </div>
  )
}

export default ProductEdit;