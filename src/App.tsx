import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ReactTable } from './components/table/ReactTable';

function App() {

  const GetRepoQuery = gql`
  query GetRepo { 
    repository(name: "react", owner: "facebook"){
      issues(last:20, states: OPEN) {
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
      </p>
    </div>
  );
}

export default App;

