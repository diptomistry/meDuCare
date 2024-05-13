
import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import {FcApprove} from 'react-icons/fc';
import { Dialog, DialogActions, DialogContent, DialogTitle,Button, Card,CardContent,Typography} from '@mui/material';

const Stroage = () => {



  const [dialogClick,setDialogClick]=useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPendingRequests,setTotalPendingRequests]=useState(0);
  const [approve, setApproveUser] = useState(false);
  const [delUser, setDelUser] = useState(false);
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const navigate = useNavigate();
  const { user } = useAuth();

  const approveUser =async (e,userId,status)=>{
    e.preventDefault();

    console.log('clicked');
    console.log(userId,status);

    try{
      const response= await axios.post('http://localhost:8000/api/users/update-status',{user_id:userId,status:status});
      console.log(response.data);
      fetchUsers();
    }
    catch {
      console.log(e);
    }


  };
  const deleteUser =async (e,userId)=>{
    e.preventDefault();

   

    try{
      const response= await axios.post('http://localhost:8000/api/users/delete-user',{user_id:userId});
      console.log(response.data);
      if(response.data.success)
      fetchUsers();

      setDelUser(false);
      setDialogClick(false);
      setconfirmDelete(false);
    }
    catch {
      console.log(e);
    }


  };
  const  fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/get-users');
      let fetchedUsers = response.data.data;

      // Filter users based on search term
      if (searchTerm) {
        fetchedUsers = fetchedUsers.filter(user =>
            Object.values(user).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }

    if (sortConfig.key) {
        fetchedUsers.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

  
      setUsers(fetchedUsers);
      const activeUsers = response.data.data.filter(User => User.Status === 'Pending');
        console.log(activeUsers); 
        setTotalPendingRequests(activeUsers);
    }
    catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };
  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
    }
    setSortConfig({ key, direction });
};
  useEffect(() => {
    fetchUsers();
}, [searchTerm, sortConfig]);

  return (
    <div className="p-6">
      {dialogClick && <Dialog open={dialogClick} className='w-200 sm-w-50'>
        <DialogTitle className='text-md'>{delUser ?"Delete this user?": "Aprrove this user?"}</DialogTitle>
        <DialogContent>

        </DialogContent>
        <div className="flex flex-row justify-between p-2">
            <Button 
              onClick={()=>{
                setApproveUser(true);
                if(delUser){
                  

                setconfirmDelete(true);
                console.log(confirmDelete);
              }
                setDialogClick(false);
              }} 
              className="bg-green-500 text-white rounded-lg m-2 px-10 py-1"
            >
              Ok
            </Button>
            <Button 
              onClick={()=>{
                setDelUser(false);
                setDialogClick(false);
              }} 
              className="bg-red-500 text-white rounded-lg m-2 px-2 py-1"
            >
              Cancel
            </Button>
          </div>
        </Dialog>}
      

      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      
      <div className="mb-4">
        <select className="py-2 px-4 border rounded-md">
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>

      <div className="mb-4">
      <div className="flex justify-between mb-4">
        {/* <div className="bg-pink-500 text-white rounded-md py-2 px-4">
          <span className="font-bold">{totalPendingRequests}</span> Pending Requestes
        </div> */}
        <div className=" text-white rounded-md py-2 px-4">
    <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="py-2 px-4 border rounded-md"
    />
</div>
        {/* <div className="bg-blue-500 text-white rounded-md py-2 px-4">
          <span className="font-bold">19</span> Today's Appointments
        </div>
        <div className="bg-green-500 text-white rounded-md py-2 px-4">
          <span className="font-bold">34</span> Total Appointments
        </div>
        <div className="bg-orange-500 text-white rounded-md py-2 px-4">
          <span className="font-bold">78</span> Total Patients
        </div> */}
      
      </div>
   
</div>

      <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
            {['Name', 'Email', 'Phone Number', 'Type', 'Gender', 'Date of Birth', 'Status', 'Action'].map((key) => (
                <th
                    key={key}
                    className="py-2 px-4 border text-sm cursor-pointer"
                    onClick={() => requestSort(key.toLowerCase())}
                >
                    {key} {sortConfig.key === key.toLowerCase() && (sortConfig.direction === 'ascending' ? '🔼' : '🔽')}
                </th>
            ))}
        </tr>
    </thead>
        <tbody>
          {users.map((User) => (
            <tr key={User.id} className="border">
              <td className="py-2 px-4 border">{User.Name}</td>
              <td className="py-2 px-4 border">{User.Email}</td>
              <td className="py-2 px-4 border">{User.Phone}</td>
              <td className="py-2 px-4 border">{User.RoleName}</td>
              <td className="py-2 px-4 border">{User.Sex}</td>
              <td className="py-2 px-4 border">{User.DOB}</td>
              <td className="py-2 px-2 border">
             
                <div className='flex flex-row items-center justify-center'>
                <button
                  className={`rounded-md py-1 px-2 ${
                    User.Status === 'Pending'
                      ? 'bg-blue-500 text-white text-sm'
                      : User.Status === 'Approved'
                      ? 'bg-green-500 text-white text-sm'
                      : 'bg-red-500 text-white text-sm'
                  }`}
                >
                  {User.Status}
                </button>
              
              
                </div>
              </td>
              <td className="py-2 px-2 border">
             
             <div className='flex flex-row items-center justify-center'>
             
             <button  onClick={(e)=>{
            
              setDialogClick(true);
              setDelUser(true);
              if(confirmDelete){
                console.log('deleting');
                deleteUser(e,User.UserID);
              }
             }} className="bg-red-500 text-white rounded-md py-1 px-2 mr-2">
             <FaTrash/>
             </button>
             { User.Status=='Pending' && <button onClick={(e)=>{
              setDialogClick(true);
              if(approve){
                approveUser(e,User.UserID,'Approved');
              }
             }} className="bg-green-500 text-white rounded-md py-1 px-2  ">
             <FcApprove/>
             </button>}
             </div>
           </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stroage;