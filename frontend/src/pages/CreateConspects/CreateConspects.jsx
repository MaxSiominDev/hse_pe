import { useForm, SubmitHandler } from 'react-hook-form';
import '../../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateConspects() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({ ...data, level: level });
    navigate('/edit');
  };

  const [level, setLevel] = useState('basic');

  return (
    <div align="center" className="first">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rec1"></div>
        <div className="rec2"></div>
        <div className="design1"></div>
        <h1 align="center" className="text">
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
        </div>
        <div>
          <textarea
            {...register('notes', { required: true })}
            style={{ fontSize: '18px' }}
            className="note"
          />
          <h3 className="text2">Уровень погружения:</h3>
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
        <button type="submit" className="b2">
          Отправить
        </button>
        <div className="design2"></div>
      </form>
    </div>
  );
}

export default CreateConspects;
