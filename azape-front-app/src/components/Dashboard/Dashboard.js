import { useState, useEffect } from 'react';
import Card from './components/Card/Card';
import OrderList from './components/OrderList/OrderList';
import { getDashboardData } from '../../services/api';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5; 

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const response = await getDashboardData(token, page, limit);
      setData(response.data);
    };

    fetchData();
  }, [page]); 

  if (!data) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="cards">
        <Card title="Pedidos" value={data.orders_count} />
        <Card title="Vendas" value={data.sales_total} />
        <Card title="Ticket Médio" value={data.average_ticket} />
      </div>

      <OrderList orders={data.orders} />

      {/* Controles de Paginação */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>
        <span>Página {page} de {data.total_pages}</span>
        <button disabled={!data.has_more} onClick={() => setPage(page + 1)}>
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
