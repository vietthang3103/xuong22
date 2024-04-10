import React from 'react'
import { useLocalStorage } from './hooks/useStogare';
import useCart from './hooks/useCart';
import { useForm } from 'react-hook-form';
import { IProduct } from '../interfaces/product';
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const OrderPage = () => {
    const form = useForm();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data, calculateTotal } = useCart();
    const { mutate } = useMutation({
        mutationFn: async (order: { userId: string, items: [], totalPrice: number, customerInfo: object }) => {
            const { data } = await axios.post("http://localhost:8080/api/order", order);
            return data;
        },
        onSuccess: () => {

        }
    })

    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data?.products,
            totalPrice: calculateTotal(),
            customerInfo: formData,
        })
    }
      return (
    <div>
        <h1>Order</h1>
        <div className='grid grid-cols-12 gap-8'>
            <div className='col-span-8'>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <input type="text" placeholder='Tên' className='border border-2' />
        <tr></tr>
        <input type="tle" placeholder='Số điện thoại' className='border border-2' />
        <tr></tr>
        <input type="email" placeholder='Email' className='border border-2' />
        <tr></tr>
        <button>Thêm sản phẩm</button>
      </form>
            </div>
            <div className='col-span-4'>
                {data?.product?.map((item: IProduct) => {
                    <div key={item._id} className='border b py-4'>
                        <h4>{item.name}</h4>
                        <h4>Giá:{item.price}</h4>
                        <h4>Số lượng:{item.quantity}</h4>
                    </div>
                })}
                <p className='mt-5'><strong className='mr-2'>Sản phẩm:</strong> {data?.products ? data?.products.length : 0}
                </p>
                <p><strong className='mr-2'>Tổng tiền:</strong> {calculateTotal()}</p>
            </div>
        </div>
    </div>
  )
}

export default OrderPage;