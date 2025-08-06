import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product.js";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader.jsx";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles.js";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const AllProducts = () => {

  const { products, isLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);


  const handleProductDelete= (id)=>{
    console.log(id);
    dispatch(deleteProduct(id));
  }

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 180, flex: 0.6 },
    {
      field: "stock",
      type: "number",
      headerName: "Stock",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      type: "number",
      headerName: "Sold out",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
         return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },

    {
      field: "delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
              <Button>
                <AiOutlineDelete size={20} onClick={()=> handleProductDelete(params.id)}/>
              </Button>
            </>
        );
      },
    },
  ];


  const row = [];

  products && products.forEach((item)=> {
    row.push({
        id: item._id,
        name: item.name,
        price: "US$ "+ item.discountPrice,
        stock: item.stock,
        sold: 10

    })
  })

  return (
    <>
    {
        isLoading ? (
            <Loader />
        ) : <div className="w-full mx-8 pt-1 mt-10 bg-white">
            <DataGrid
                rows= {row}
                columns={columns}
                pageSize= {10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    }
    </>
  )
};

export default AllProducts;
