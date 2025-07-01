import { useForm, SubmitHandler } from "react-hook-form"
import './App.css'

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {

  }

  return (
    
      <div align="center" class="App-header">
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 align="center">Каталог товаров</h2>
      <input {...register("conspect", { required: true })} placeholder="Напиши конспект"/>
  
      <input type="submit" />
    </form>
      </div>
  )
  
} 