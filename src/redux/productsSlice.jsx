import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Tạo action async sử dụng createAsyncThunk
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    try {
        const response = await fetch('https://6571c770d61ba6fcc01389ff.mockapi.io/api/task1/products');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }

});
// Thêm sản phẩm mới
export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
    try {
        const response = await fetch('https://6571c770d61ba6fcc01389ff.mockapi.io/api/task1/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        console.log(product)
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }
});
export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
    try {
        const response = await fetch(`https://6571c770d61ba6fcc01389ff.mockapi.io/api/task1/products/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating record:', error);
    }
});
// Xóa sản phẩm
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    try {
        await fetch(`https://6571c770d61ba6fcc01389ff.mockapi.io/api/task1/products/${productId}`, {
            method: 'DELETE',
        });
        return productId;
    } catch (error) {
        throw new Error('Error deleting product');
    }
});


// Khởi tạo reducer
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],

        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })




            .addCase(addProduct.fulfilled, (state, action) => {
                const newProduct = action.payload;
                state.data = [...state.data, newProduct]
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload;
                const index = state.data.findIndex((p) => p.id === updatedProduct.id);
                if (index !== -1) {
                    state.data[index] = updatedProduct;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.data = state.data.filter((product) => product.id !== action.payload);
            })


    },
});

export default productsSlice.reducer;