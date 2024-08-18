import RegisterLayout from "../components/loginRegister/RegisterLayout"
import UserRegister from "../components/loginRegister/UserRegister"

const Register = () => {
  return (
    <>
    <div className="flex h-[100vh] w-full"> 
        <RegisterLayout/>
        <UserRegister/>
    </div>
    </>
  )
}

export default Register