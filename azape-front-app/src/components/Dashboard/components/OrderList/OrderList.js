import React from 'react';

const OrderList = ({ orders }) => (
  <table>
    <thead>
      <tr>
        <th>ID Pedido</th>
        <th>Data Criação</th>
        <th>Nome do Cliente</th>
        <th>CPF Cliente</th>
        <th>Status Pedido</th>
        <th>Status Pagamento</th>
        <th>Método Pagamento</th>
        <th>Total R$</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order._id}>
          <td>{order._id}</td>
          <td>{new Date(order.createdAt).toLocaleString()}</td>
          <td>{order.customer?.name || 'N/A'}</td>
          <td>{order.customer?.doc || 'N/A'}</td>
          <td>{order.status}</td>
          <td>{order.payment?.status || 'N/A'}</td>
          <td>{order.payment?.method || 'N/A'}</td>
          <td>{order.resume?.amount?.toFixed(2) || '0.00'}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default OrderList;
