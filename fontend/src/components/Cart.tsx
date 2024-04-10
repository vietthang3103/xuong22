import { ChangeEvent } from 'react';
import useCart from './hooks/useCart';


const CartPage = () => { 
   const { data, mutate, handleQuantityChange, calculateTotal, isLoading, isError } = useCart();
    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Error</p>
   
    return (
        <div className='container'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng giá</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products.map((product: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className='border-2'>{product.name}</td>
                                <td className='border-2'>{product.price}</td>
                                <td className='border-2'>
                                    <button className='py-2 px-4 bg-emerald-400' onClick={() => mutate({action: "INCREMENT", productId: product.productId})}>+</button>
                                    {product.quantity}
                                    <input type="number" className='border border-red-100' onInput={(e) => handleQuantityChange(product.productId, e as any)} />
                                    <button className='py-2 px-4 bg-slate-400' onClick={() => mutate({action: "DECREMENT", productId: product.productId})}>-</button>
                                </td>
                                <td className='border-2'>{product.price * product.quantity}</td>
                                <td>

                                </td>
                                <td>
                                    <button className='py-2 px4 bg-red-500 text-white rounded-sm' onClick={() => mutate({action: "REMOVE", productId: product.productId})}>Xóa</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <p>Total: ${calculateTotal()}</p>
        </div>
    )
}

export default CartPage 