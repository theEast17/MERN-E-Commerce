import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  fetchProductsByFilter,
  updateProduct,
} from "./productApi";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  totalItems:0,
  selectedProduct: null,
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response;
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilter(filter,sort,pagination);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/create",
  async (product) => {
    const response = await createProduct(product);
    return response;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/update",
  async (update) => {
    const response = await updateProduct(update);
    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.products = action.payload; //it means the response you are getting from the server
    });
    builder.addCase(fetchProductsByFilterAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.products = action.payload.products;
      state.totalItems = action.payload.totalItems;
    });
    builder.addCase(fetchBrandsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBrandsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.brands = action.payload;
    });
    builder.addCase(fetchCategoriesAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.categories = action.payload;
    });
    builder.addCase(fetchProductByIdAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.selectedProduct = action.payload;
    });
    builder.addCase(createProductAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.products.push(action.payload);
    });
    builder.addCase(updateProductAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      state.status = "idle";
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      state.products[index] = action.payload;
    });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => {
  return state.product.products;
};
export const selectAllBrands = (state) => {
  return state.product.brands;
};
export const selectAllCategories = (state) => {
  return state.product.categories;
};
export const selectProductById = (state) => {
  return state.product.selectedProduct;
};
export const filterProducts = (state) => {
  return state.product.products;
};
export const selectTotalItems = (state) => {
  return state.product.totalItems;
};

export default productSlice.reducer;
