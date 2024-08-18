import img from "../../assets/Login.jpg"
//image of register and login
const RegisterLayout = () => {
  return (
    <>
    <div className="h-[100vh] w-[50%] md:block hidden">
        <img className="h-full w-full" src={img}/>
    </div>
    </>
  )
}

export default RegisterLayout