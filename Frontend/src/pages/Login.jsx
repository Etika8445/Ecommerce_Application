import RegisterLayout from "../components/loginRegister/RegisterLayout"
import Userlogin from "../components/loginRegister/Userlogin"

const Login = () => {
  return (
    <>
    <div className="flex h-[100vh] w-full"> 
        <RegisterLayout/>
        <Userlogin/>
    </div>
    </>
  )
}

export default Login