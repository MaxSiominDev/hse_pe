import '../../App.css';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function CreateConspects() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log({ ...data, level: level });
    navigate('/edit');
  };

  const [level, setLevel] = useState('basic');
  const textareaRef = useRef(null);
  const notesValue = watch('notes', '');

  // Автоподстройка высоты
  useEffect(() => {
    if (textareaRef.current) {
      // Сначала сбрасываем высоту
      textareaRef.current.style.height = 'auto';
      // Затем устанавливаем новую высоту (но не больше 200px)
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200,
      )}px`;
    }
  }, [notesValue]);

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
            ref={(e) => {
              register('notes').ref(e);
              textareaRef.current = e;
            }}
            style={{
              fontSize: '18px',
              minHeight: '40px',
              resize: 'none', // Отключаем ручное изменение размера
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
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
