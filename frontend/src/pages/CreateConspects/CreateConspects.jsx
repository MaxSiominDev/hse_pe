import { useForm, SubmitHandler } from 'react-hook-form';
import '../../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateConspects() {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/edit');
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  const [level, setLevel] = useState('basic');

  return (
    <div align="center" class="first">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="rec1"></div>
        <div class="rec2"></div>
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
          <h3>Уровень погружения:</h3>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            style={{ fontSize: '16px' }}
          >
            <option value="basic">Базовый</option>
            <option value="medium">Средний</option>
            <option value="advanced">Повышенный</option>
          </select>
        </div>
        <button type="submit" class="b2" onClick={handleEditClick}>
          Отправить
        </button>
        <div class="design2"></div>
      </form>
    </div>
  );
}

export default CreateConspects;
