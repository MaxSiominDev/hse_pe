import '../../App.css';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function CreateConspects() {
  const server_url = "http://localhost:8080"
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = async (data) => {
    const body = { ...data, level: level };
    try {
    const response = await fetch(server_url + '/api/new-note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        body
      ),
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании заметки');
    }

    const data = await response.json();
    navigate('/edit');
    return data; // Возвращает созданную заметку (Note)
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
    
    
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
        200
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
            placeholder="Ваши заметки по теме"
            ref={(e) => {
              register('notes').ref(e);
              textareaRef.current = e;
            }}
            style={{
              fontSize: '18px',
              minHeight: '40px',
              resize: 'none', // Отключаем ручное изменение размера
              overflowY: 'auto',
              boxSizing: 'border-box'
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
      <button type="submit" className="ad-banner">
         <h1 className='ad-text'>Здесь могла быть ваша реклама</h1>
        </button>
        <div className="hat">
      <form className="hat-title">Conspects - лучшее решение для ваших конспектов</form>
      <div className="hat-circle"></div>
      <button type="submit" className="hat-rectangle">Узнать больше о Premium</button>
    </div>
    </div>
  );
}

export default CreateConspects;