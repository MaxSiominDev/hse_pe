import { useForm, SubmitHandler } from 'react-hook-form';
import './App.css';

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <div align="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="design1"></div>
        <h1 align="center" class="text">
          Создать конспект
        </h1>

        <div>
          <input
            {...register('conspect', { required: true })}
            placeholder="Предмет"
            style={{ fontSize: '14px' }}
          />
          <input
            {...register('theme', { required: true })}
            placeholder="Тема"
            style={{ fontSize: '14px' }}
          />
          <input
            {...register('level', { required: true })}
            placeholder="Уровень погружения"
            style={{ fontSize: '14px' }}
          />
        </div>
        <button type="submit" class="b2">
          Отправить
        </button>
        <div class="design2"></div>
      </form>
    </div>
  );
}
