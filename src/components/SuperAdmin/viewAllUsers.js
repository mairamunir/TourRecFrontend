// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ViewAllUsers = () => {
//     const [details, setDetails] = useState([]);
//     const token = useSelector((state) => state.user.token);

//     useEffect(() => {
//         fetchDetails();
//     }, []);

//     const fetchDetails = async () => {
//         try {
//             const response = await axios.get("http://localhost:3000/superAdmin/getAllUsers", {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             if (response.data.data) {
//                 setDetails(response.data.data);
//             } else {
//                 toast.error(response.data.msg || 'Error fetching users');
//             }
//         } catch (error) {
//             console.error('Error fetching users:', error);
//             toast.error('Error fetching users.');
//         }
//     };

//     const deleteUser = async (email) => {
//         try {
//             const response = await axios.delete("http://localhost:3000/superAdmin/deleteUser", {email:email}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             if (response.data.success) {
//                 toast.success('User deleted successfully');
//                 setDetails(details.filter(detail => detail.id !== userId));
//             } else {
//                 toast.error(response.data.msg || 'Error deleting user');
//             }
//         } catch (error) {
//             console.error('Error deleting user:', error);
//             toast.error('Error deleting user.');
//         }
//     };

//     return (
//         <div>
//             <h1>User Details</h1>
//             {details.length > 0 ? (
//                 <table>
//                     <thead>
//                         <tr>
//                                 <th>First Name</th>
//                                 <th>Last Name</th>
//                                 <th>Email</th>
//                                 <th>Province</th>
//                                 <th>Admin</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {details.map(detail => (
//                             <tr key={detail.id}>
//                                 <td>{detail.firstName}</td>
//                                 <td>{detail.lastName}</td>
//                                 <td>{detail.email}</td>
//                                 <td>{detail.province}</td>
//                                 <td>{detail.admin}</td>
//                                 <td>
//                                 <button onClick={() => deleteUser(detail.email)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No details available.</p>
//             )}
//         </div>
//     );
// };

// export default ViewAllUsers;