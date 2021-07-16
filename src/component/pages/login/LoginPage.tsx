
import React, { ChangeEvent, FormEvent, useState } from "react"
import { sendLogin } from "../../../remote/grubdash-backend/trms.api";
import { useHistory } from 'react-router-dom';

// // Type whatever you expect in 'this.props.match.params.*'
// type PathParamsType = {
//   param1: string,
// }

// // Your component own properties
// type PropsType = RouteComponentProps<PathParamsType> & {
//   someString: string,
// }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginPage = () =>{

  let history = useHistory();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

    
     const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
      };
    
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      }

     const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
        e.preventDefault();
        // Send an Axios Request
        
        const response = await sendLogin(username, password);
        if(response) {
          history.push("/home");
        }
      }
    
        return (
            <div  style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
          }}  id='login-form'>
            <form onSubmit={handleFormSubmit} >
              <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">Username</label>
                <input type="text" className="form-control" id="usernameInput"
                  onChange={handleUsernameChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input type="password" className="form-control" id="passwordInput"
                  onChange={handlePasswordChange} />
              </div>
              <input type="submit" className="btn btn-primary" value='Login' />
            </form>
          </div>)
    
}

export default LoginPage;