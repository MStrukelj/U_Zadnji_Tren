import { useState } from "react";

function LogIn({FormHandle}) {
   const [User, setUser] = useState('');
   const [Password, setPassword] =useState('');

   function handleLogin(e){
      e.preventDefault();
      console.log(User,Password);
      setUser("");
      setPassword("");
      
   }
   return (
   <div className="form-container">
   <h2>Login</h2>
   <form onSubmit={handleLogin}>
   <div className="form-control">
   <input type="text" placeholder="Enter your email" 
      onChange={(e)=>setUser(e.target.value)} />
   </div>
   
   <div className="form-control">
   <input type="password" placeholder="Enter your password" 
     onChange={(e)=>setPassword(e.target.value)}/>
   </div>
   
   <button onClick={handleLogin}>Log In</button>
   </form>
   <p onClick={() => FormHandle("signup")}>Don't have an Account? Signup</p>
   </div>
   );
   }
   
   export default LogIn;