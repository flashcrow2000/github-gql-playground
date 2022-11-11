import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ReactTable } from './components/table/ReactTable';
import { Toolbar } from './components/toolbar/Toolbar';

function App() {
  const [pageSize, setPageSize] = useState(20);
  const GetRepoQuery = gql`
  query GetRepo($pageSize: Int!) { 
    repository(name: "react", owner: "facebook"){
      issues(last:$pageSize, states: OPEN) {
        edges {
          node {
            author {
              login
            }
            number
            title
            url
            createdAt
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }  
  `;
  const [rows, setRows] = useState<any[]>([]);
  const { data, refetch } = useQuery(GetRepoQuery, {
    variables: { pageSize }
  });

  useEffect(() => {
    if (data) {
      setRows(data.repository?.issues?.edges ?? []);
    }
  }, [data]);

  useEffect(() => {
    console.log('new pagesize:', pageSize);
    refetch({pageSize});
  }, [pageSize]);
  
  return (
    <div>
      <p>
        <ReactTable rows={rows} />
        <Toolbar pageSize={pageSize} setPageSize={setPageSize}/>
      </p>
    </div>
  );
}

export default App;

