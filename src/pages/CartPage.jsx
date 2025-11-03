import React, { useEffect, useState, useContext } from "react";
import { cartService } from "../services/cartService";
import { orderService } from "../services/orderService";
import { AuthContext } from "../auth/AuthProvider";

export default function CartPage() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  const load = async () => {
    if (!user) return;
    try {
      const res = await cartService.getByUser(user.id);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, [user]);

  const updateQty = async (cartId, qty) => {
    await cartService.updateQuantity(cartId, qty);
    load();
  };

  const remove = async (cartId) => {
    await cartService.removeItem(cartId);
    load();
  };

  const clear = async () => {
    await cartService.clearCartByUser(user.id);
    load();
  };

  const checkout = async () => {
    const payload = {
      userId: user.id,
      items: items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity,
        unitPrice: i.product.price,
      })),
    };
    await orderService.create(payload);
    alert("Order created");
    clear();
  };

  return (
    <div>
      <h2>Cart</h2>
      {!user ? (
        <p>Please login to see your cart.</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Sub</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td>{it.product.name}</td>
                  <td>{it.product.price}</td>
                  <td>
                    <input
                      type="number"
                      value={it.quantity}
                      onChange={(e) => updateQty(it.id, Number(e.target.value))}
                      style={{ width: 60 }}
                    />
                  </td>
                  <td>{it.product.price * it.quantity}</td>
                  <td>
                    <button onClick={() => remove(it.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12 }}>
            <button onClick={clear}>Clear Cart</button>
            <button onClick={checkout} style={{ marginLeft: 8 }}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
