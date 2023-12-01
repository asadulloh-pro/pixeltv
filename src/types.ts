import { tarifs } from './pages/index';

export interface ITickets {
  doc_number: number;
  doc_date: Date;
  cheque_number: string;
  cheque_date: Date;
  cheque_amount: number;
  parent_name: string;
  phone_number: string;
  children_name: string;
  service_name: keyof typeof tarifs;
  service_amount: number;
  came_out: boolean;
}
