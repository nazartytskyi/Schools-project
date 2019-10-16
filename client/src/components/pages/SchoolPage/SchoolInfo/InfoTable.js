import React from 'react';
import MaterialTable from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';

export default function InfoTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Birth Data', field: 'birthData', type: 'date' },
      { title: 'status',  field: 'status' },
      { title: 'dateApply', field: 'dateApply',  type: 'date'},
      { title: 'firstPriority', field: 'firstPriority'}
    ],
    data: [
      { 
        name: 'Прийма Ярослав Юрійович',
        birthData: '11.10.1999',
        status: 'Подано оригінали',
        dateApply: '16.10.2019',
        firstPriority: 'Yes'
      },
      {
        name: 'Прийма Ярослав Юрійович',
        birthData: '11.10.1999',
        status: 'Підтверджено',
        dateApply: '12.10.2019',
        firstPriority: 'Yes'
      },
      {
        name: 'Прийма Ярослав Юрійович',
        birthData: '11.10.1999',
        status: 'Підтверджено',
        dateApply: '12.10.2019',
        firstPriority: 'Yes'
      },
      {
        name: 'Прийма Ярослав Юрійович',
        birthData: '11.10.1999',
        status: 'Підтверджено',
        dateApply: '12.10.2019',
        firstPriority: 'No'
      },
      {
        name: 'Прийма Ярослав Юрійович',
        birthData: '11.10.1999',
        status: 'Підтверджено',
        dateApply: '12.10.2019',
        firstPriority: 'No'
      },
      {
        name: 'Прийма Ярослав Юрійович',
        birthData: '11.10.1999',
        status: 'Підтверджено',
        dateApply: '12.10.2019',
        firstPriority: 'Yes'
      },
      {
        name: 'Прийма Ярослав Юрійович',
        birthData: '11.10.1999',
        status: 'Підтверджено',
        dateApply: '12.10.2019',
        firstPriority: 'No'
      },
    ],
  });

  return (
    <MaterialTable
      title="Заявки"
      columns={state.columns}
      data={state.data}

    />
  );
}