import { FC } from 'react';
import Timer from './timer';
import { ITickets } from '../types';
import moment from 'moment';
import { tarifs } from '../pages/index';

type TableType = {
  data: ITickets[];
};
const Table: FC<TableType> = ({ data }) => {
  return (
    <div className="rounded-[1.5rem] overflow-hidden  bg-white w-full">
      <div className="row_style gap-[1rem]  text-[1.3rem] font-[700] border_bottom w-full text-gray">
        <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
          #
        </div>
        <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
          Имя ребенка
        </div>
        <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
          Hомер чека
        </div>
        <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
          Время входа
        </div>
        <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
          Время выхода
        </div>
        <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
          Оставшееся время
        </div>
      </div>
      {data?.map((elem, index) => (
        <div
          className={`row_style gap-[1rem]  text-[1.5rem] font-[700] text-black border_bottom w-full ${
            (index + 1) % 2 ? 'bg-[#ef245a14]' : ''
          }`}
          key={elem?.cheque_number}
        >
          <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
            {index + 1}
          </div>
          <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
            {elem?.children_name}
          </div>
          <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
            {elem?.cheque_number.substring(elem?.cheque_number.length - 7)}
          </div>
          <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
            {moment(elem?.doc_date).format('HH:mm')}
          </div>
          <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
            {moment(elem?.doc_date)
              .add(tarifs[elem.service_name], 'minutes')
              .format('HH:mm')}
          </div>
          <div className="px-[1rem] py-[0.5rem] min-h-[2.8rem] flex items-center">
            <Timer
              endTime={
                new Date(
                  moment(elem?.doc_date)
                    .add(tarifs[elem.service_name], 'minutes')
                    .format()
                )
              }
            />
          </div>
        </div>
      ))}
      <div
        className={`row_style gap-[1rem]  text-[0.75rem] font-[600] border_bottom w-full ${
          (data?.length + 1 )% 2 ? 'bg-[#ef245a14]' : ''
        }`}
      >
        <div className="px-[1rem] py-[0.5rem] min-h-[1.8rem] flex items-center"></div>
        <div className="px-[1rem] py-[0.5rem] min-h-[1.8rem] flex items-center"></div>
        <div className="px-[1rem] py-[0.5rem] min-h-[1.8rem] flex items-center"></div>
        <div className="px-[1rem] py-[0.5rem] min-h-[1.8rem] flex items-center"></div>
        <div className="px-[1rem] py-[0.5rem] min-h-[1.8rem] flex items-center"></div>
      </div>
    </div>
  );
};

export default Table;
