import './Toolbar.css';

type ToolbarProps = {
  pageSize?: number;
  setPageSize?: (newSize: number) => void;
  handleGetNextPage?: () => void;
}

const options = [
  {
    value: "5",
  },
  {
    value: "10",
  },
  {
    value: "20",
  },
  {
    value: "50",
  },
];

export const Toolbar = ({pageSize, setPageSize, handleGetNextPage}: ToolbarProps) => {
  return (
    <div className='container'>
      <select onChange={(ev) => console.log(ev.target.value)}>
        {options.map((option) => (
          <option value={option.value} selected={+option.value === pageSize}>{option.value}</option>
        ))}
    </select>
    </div>
  )
}