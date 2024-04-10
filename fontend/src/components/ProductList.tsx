import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../interfaces/product';
import { useLocalStorage } from './hooks/useStogare';

const ProductList = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const queryClient = useQueryClient(); // Di chuyển đến đây để đảm bảo được định nghĩa trước khi sử dụng
    const { mutate } = useMutation({
        mutationFn: async ({productId, quantity}: { productId: string, quantity: string }) => {
            const {data} = await axios.post(`http://localhost:8080/api/cart`, {
                userId,
                productId,
                quantity,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart", userId],
            });
        }
    });

    const { data } = useQuery({
        queryKey: ['PRODUCTS'],
        queryFn: async() => {
            const { data } = await axios.get(`http://localhost:8080/api/products`);
            return data.products;
        },
    });

    return (
        <div className='container'>
            <div className="d-flex justify-content-between">
                <h2 className='mt-2'>Quản lí sản phẩm</h2>
                <Link to="products/add" className='btn btn-primary'>Thêm</Link>
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ảnh</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((product: IProduct, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={product.image} alt="" width={50} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <Link className='btn btn-primary' to={`admin/products/${product._id}/edit`}>Cập nhập</Link>
                                | |
                                <button onClick={() => mutate(product._id!)} className='btn btn-danger'>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;