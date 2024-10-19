import './App.css'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt'
import { useEffect, useState } from 'react';
DataTable.use(DT)

interface IUser {
  name:string;
  email:string;
  gender:string;
  status:string;
}

function App() {  
  const [tableData, setTableData] = useState<string[][]>([])


  const getData = () => {
    fetch('https://gorest.co.in/public/v2/users')
      .then(response => response.json())
      .then((data:IUser[])=>
        setTableData(
          data.map((user) => [
            user.name,
            user.email,
            user.gender,
            user.status
          ])
        )
      )
      .catch(error => console.error('Error fetching data: ', error))
  }

  useEffect(()=>{
    getData()
  },[]);

  const options = {
    pageLength: 5,
    lengthMenu: [
      [5, 10, 20, 100],
      [5, 10, 20, 100]
    ]
  }

  return (
    <>
      <div>
      <DataTable data={tableData} className='display' options={options}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>            
          </tr>
        </thead>
      </DataTable>
      </div>            
    </>
  )
}

export default App
