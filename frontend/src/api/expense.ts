import { api } from "@/utils/functions";

export const getExpenses = async () => {
  const { data } = await api.get("/expenses");
  return data.data;
};

export const createExpense = async (payload: any) => {
  const { data } = await api.post("/expenses", payload);
  return data.data;
};

export const updateExpense = async (id: string, payload: any) => {
  const { data } = await api.put(`/expenses/${id}`, payload);
  return data.data;
};

export const deleteExpense = async (id: string) => {
  const { data } = await api.delete(`/expenses/${id}`);
  return data;
};

export const getExpenseById = async (id: string) => {
  const { data } = await api.get(`/expenses/${id}`);
  return data.data;
};
