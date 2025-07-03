import { useForm, SubmitHandler } from "react-hook-form"
import './App.css'

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    //ss
  }

  return (
    
      <div align="center" class="App-header">
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 align="center" class="text">Конспекты по темам и уровню изучения</h2>
      <input {...register("conspect", { required: true })} placeholder="Предмет, тема, уровень погружения"/>
      <button type="submit">Отправить</button>
    </form>
      </div>
    
  )
  
}