import React, { useEffect, useState, useContext } from "react";
import { orderService } from "../services/orderService";
import { AuthContext } from "../auth/AuthProvider";

export default function OrdersPage() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const load = async () => {
    try {
      if (user) {
        const res = await orderService.getByUser(user.id);
        setOrders(res.data);
      } else {
        const res = await orderService.getAll();
        setOrders(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, [user]);

  const changeStatus = async (id, status) => {
    await orderService.changeStatus(id, status);
    load();
  };

  return (
    <div>
      <h2>Orders</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td>{o.id}</td>
              <td>{o.user?.fullName || o.user?.username}</td>
              <td>{o.orderDate}</td>
              <td>{o.status}</td>
              <td>
                <button onClick={() => changeStatus(o.id, "PROCESSING")}>
                  Processing
                </button>
                <button onClick={() => changeStatus(o.id, "SHIPPED")}>
                  Shipped
                </button>
                <button onClick={() => changeStatus(o.id, "DELIVERED")}>
                  Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
