import React from 'react';
import './OrderList.css';
import { formatCPForCNPJ } from '../../../utils/formatters';

const orderStatus = {
  'pending': 'Pendente',
  'processing': 'Em processamento',
  'canceled': 'Cancelado',
  'completed': 'Concluído',
  'succeeded': 'Realizado',
  'paid': 'Pago',
};

const paymentStatus = {
  'pending': 'Pendente',
  'succeeded': 'Realizado',
  'processing': 'Em processamento',
  'canceled': 'Cancelado',
  'Aprovada': 'Aprovado',
};

const paymentMethod = {
  'credit': 'Crédito',
  'credit_installments': 'Crédito parcelado',
  'pix': 'PIX',
  'boleto': 'Boleto',
};

const formatCurrency = (value) => {
  if (!value && value !== 0) return '0,00';

  const formattedValue = parseFloat(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return `${formattedValue}`;
};

const OrderList = ({ orders, isLoading }) => (
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th className="truncate">ID do Pedido</th>
          <th className="truncate">ID na Loja</th>
          <th className="truncate">Criação</th>
          <th className="truncate">Nome do cliente</th>
          <th className="truncate">CPF/CNPJ do cliente</th>
          <th className="truncate status-col">Status do pedido</th>
          <th className="truncate status-col">Status do pagamento</th>
          <th className="truncate">Método de pagamento</th>
          <th className="truncate text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
              Carregando dados...
            </td>
          </tr>
        ) : orders.length === 0 ? (
          <tr>
            <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
              Nenhum pedido encontrado
            </td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order._id}>
              <td className="truncate">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  #{order._id}
                  {(order.refund || order.replacement_product) && (
                    <div className='refund'>
                      <span className="material-icons" style={{ color: 'white', fontSize: '16px' }}>cached</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="truncate">#{order.order_seller_id}</td>
              <td className="truncate">
                {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </td>
              <td className="truncate">{order.customer?.name || 'N/A'}</td>
              <td className="truncate">{formatCPForCNPJ(order.customer?.doc)}</td>
              <td className="truncate status-col">
                {orderStatus[order.status] || order.status}
              </td>
              <td className="truncate status-col">
                {paymentStatus[order.payment?.status] || order.payment?.status || 'N/A'}
              </td>
              <td className="truncate">
                {paymentMethod[order.payment?.method] || order.payment?.method || 'N/A'}
              </td>
              <td className="truncate">
                <div style={{ display: "flex" }}>
                  <span>R$</span>
                  <span style={{ flexGrow: "1" }}>{formatCurrency(order.payment?.amount)}</span>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default OrderList;
