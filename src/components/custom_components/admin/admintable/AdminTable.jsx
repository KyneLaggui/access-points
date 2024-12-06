import { useEffect } from "react";
import { columns } from "./columns";
import DataTable from "./data-table";

export default function AdminTable() {
  // const dispatch = useDispatch();
  // const { orders: fetchedOrders } = fetchAllOrders(); // Fetch products from Supabase

  // useEffect(() => {
  //   if (fetchedProducts) {
  //     const allOrders = fetchedOrders.map((product) => ({
  //       id: product.id,
  //       name: product.name,
  //       description: product.description,
  //       sellMethod: product.sell_method,
  //       attributes: product.attributes,
  //       price: product.price,
  //     }));

  //   }

  // }, [fetchedOrders, dispatch]);

  return <DataTable columns={columns} />; // Pass Redux products to DataTable
}
