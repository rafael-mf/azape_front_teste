import React from 'react';
import './OrderList.css';
import { formatCPForCNPJ } from '../../../utils/formatters';

const OrderList = ({ orders }) => (
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th className="truncate">ID do Pedido</th>
          <th className="truncate">ID na Loja</th>
          <th className="truncate">Criação</th>
          <th className="truncate">Nome do cliente</th>
          <th className="truncate">CPF/CNPJ do cliente</th>
          <th className="truncate">Status do pedido</th>
          <th className="truncate">Status do pagamento</th>
          <th className="truncate">Método de pagamento</th>
          <th className="truncate">Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td className="truncate">#{order._id}</td>
            <td className="truncate">#{order.order_seller_id}</td>
            <td className="truncate">{new Date(order.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}</td>
            <td className="truncate">{order.customer?.name || 'N/A'}</td>
            <td className="truncate">{formatCPForCNPJ(order.customer?.doc)}</td>
            <td className="truncate">{order.status}</td>
            <td className="truncate">{order.payment?.status || 'N/A'}</td>
            <td className="truncate">{order.payment?.method || 'N/A'}</td>
            <td className="truncate">{order.payment?.amount?.toFixed(2) || '0.00'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderList;
