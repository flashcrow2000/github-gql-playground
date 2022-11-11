import { gql, useQuery } from '@apollo/client';
import { isNonEmptyArray } from '@apollo/client/utilities';
import { useEffect, useState } from 'react';
import { ReactTable } from './components/table/ReactTable';
import { Toolbar } from './components/toolbar/Toolbar';

function App() {
  const [pageSize, setPageSize] = useState(20);
  const GetRepoQuery = gql`
  query GetRepo { 
    repository(name: "react", owner: "facebook"){
      issues(last:${pageSize}, states: OPEN) {
        edges {
          node {
            number
            title
            createdAt
            url
            author { login }
          }
          cursor
        }
      }
    }
  }  
  `;
  const [rows, setRows] = useState<any[]>([]);
  const { loading, error, data } = useQuery(GetRepoQuery);

  useEffect(() => {
    if (data) {
      setRows(data.repository?.issues?.edges ?? []);
    }
  }, [data])

  
  
  return (
    <div>
      <p>
        <ReactTable rows={rows} />
        <Toolbar />
      </p>
    </div>
  );
}

export default App;

