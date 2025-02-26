import { useState, useEffect, useCallback, useRef } from "react";
import Card from "./components/Card/Card";
import OrderList from "./components/OrderList/OrderList";
import { getDashboardData } from "../../services/api";
import "./Dashboard.css";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const initialLoadComplete = useRef(false);
  const [tableLoading, setTableLoading] = useState(false);

  const calculatePageRange = () => {
    let start = Math.max(1, page - 2);
    let end = Math.min(start + 4, totalPages);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await getDashboardData(token, page, limit);

      setSummaryData({
        orders_count: response.data.orders_count,
        sales_count: response.data.sales_count,
        sales_total: response.data.sales_total,
        orders_total: response.data.orders_total,
        average_ticket: response.data.average_ticket
      });

      setOrders(response.data.orders);
      const newTotalPages = response.data.total_pages;
      setTotalPages(newTotalPages);

      if (page > newTotalPages) {
        setPage(newTotalPages > 0 ? newTotalPages : 1);
      }

      initialLoadComplete.current = true;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  const fetchTableData = useCallback(async () => {
    try {
      setTableLoading(true);
      setOrders([]);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await getDashboardData(token, page, limit);

      setOrders(response.data.orders);
      const newTotalPages = response.data.total_pages;
      setTotalPages(newTotalPages);

      if (page > newTotalPages) {
        setPage(newTotalPages > 0 ? newTotalPages : 1);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da tabela:", error);
    } finally {
      setTableLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    if (!initialLoadComplete.current) {
      fetchInitialData();
    }
  }, [fetchInitialData]);

  useEffect(() => {
    if (initialLoadComplete.current) {
      fetchTableData();
    }
  }, [page, limit, fetchTableData]);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  if (loading) return <div>Carregando...</div>;
  if (!summaryData) return <div>Nenhum dado encontrado</div>;

  const cardsData = [
    {
      title: `${summaryData.orders_count} Pedidos`,
      value: formatCurrency(summaryData.orders_total),
      icon: "contract",
      color: "#F4C8E1",
    },
    {
      title: `${summaryData.sales_count} Vendas`,
      value: formatCurrency(summaryData.sales_total),
      icon: "paid",
      color: "#B6EEDD",
    },
    {
      title: "Ticket Médio",
      value: formatCurrency(summaryData.average_ticket),
      icon: "calculate",
      color: "#C3E7F3",
    },
  ];

  const pageRange = calculatePageRange();

  return (
    <div>
      <span style={{ fontSize: "19px" }}>Resumo dos pedidos</span>

      <div className="cards">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>

      <OrderList orders={orders} isLoading={tableLoading} />

      <div className="pagination">
        <div className="page-list">
          <span
            className="material-symbols-outlined"
            onClick={() => setPage(1)}
            style={{
              cursor: "pointer",
              opacity: page === 1 ? 0.5 : 1
            }}
          >
            keyboard_double_arrow_left
          </span>

          <span
            className="material-symbols-outlined"
            onClick={() => page > 1 && setPage(page - 1)}
            style={{
              cursor: "pointer",
              opacity: page === 1 ? 0.5 : 1
            }}
          >
            chevron_left
          </span>

          {pageRange.map((p) => (
            <button
              key={p}
              className={`btn-pagina ${page === p ? "btn-pagina-selected" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}

          <span
            className="material-symbols-outlined"
            onClick={() => page < totalPages && setPage(page + 1)}
            style={{
              cursor: "pointer",
              opacity: page === totalPages ? 0.5 : 1
            }}
          >
            chevron_right
          </span>

          <span
            className="material-symbols-outlined"
            onClick={() => setPage(totalPages)}
            style={{
              cursor: "pointer",
              opacity: page === totalPages ? 0.5 : 1
            }}
          >
            keyboard_double_arrow_right
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ paddingInline: "15px" }}>{page} de {totalPages} páginas</span>

          <div>
            <label>Linhas por página</label>
            <select
              value={limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
            >
              {[5, 10, 15, 20].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;