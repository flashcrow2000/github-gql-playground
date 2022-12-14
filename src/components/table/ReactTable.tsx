import Table from 'rc-table';
import { useEffect, useState } from 'react';
import './ReactTable.css';

export const ReactTable = ({rows}: {rows: any[]}) => {

  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    const processedRows = (rows ?? []).map((row: any) => ({
      number: row.node.number,
      title: row.node.title,
      createdAt: row.node.createdAt,
      url: row.node.url,
      author: row.node.author.login,
      cursor: row.node.cursor
    }));
    console.log(processedRows);
    setTableData(processedRows);
    //console.log(rows);
  }, [rows])

  const columns = [
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 100,
      render: (text: string, record: any) => {
        return (
        <div style={{textAlign: 'center'}}>
          {text}
        </div>
      )},
    },
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      width: 100,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 450
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width:200,
      render: (text: string, record: any) => {
        const createdAtDate = new Date(text);
        console.log(createdAtDate);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' }

        return (
          <div style={{textAlign: 'center'}}>
          {createdAtDate.toLocaleDateString('en-UK')}
        </div>
      )},
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      width:100,
      render: (text: string, record: any) => {
        return (
        <a href={text}>
          {record.number}
        </a>
      )},
    },
  ];

  return (
    <div className='tableContainer'>
      <Table
        columns={columns}
        data={tableData}
        tableLayout='auto'
      />
    </div>
  );
};