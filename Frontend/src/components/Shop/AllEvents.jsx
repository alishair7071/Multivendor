import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event.js";

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);


  const handleEventDelete= (id)=>{
    dispatch(deleteEvent(id));

    console.log("handle delete is called: "+id);
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
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
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
                <AiOutlineDelete size={20} onClick={()=> handleEventDelete(params.id)}/>
              </Button>
            </>
        );
      },
    },
  ];


  const row = [];

  events && events.forEach((item)=> {
    row.push({
        id: item._id,
        name: item.name,
        price: "US$ "+ item.discountPrice,
        stock: item.stock,
        sold: item.sold_out

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

export default AllEvents;
