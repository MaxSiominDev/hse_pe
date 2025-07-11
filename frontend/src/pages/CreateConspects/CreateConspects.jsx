import '../../App.css';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function CreateConspects() {
  const server_url = "http://89.169.191.1:8080"
  const Stas_url = "https://strevesuksess.github.io/Portfolio/"
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const Stas_ad = () => {
    navigate(Stas_url);
  };

  const onSubmit = async (data) => {
    const body = {
      "subject": data.conspect,
      "topic": data.theme,
      "level": +data.level
    };
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
    navigate(`/edit/${data.id}`);
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
        <select {...register('level', { required: true })}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            style={{ fontSize: '16px' }}
          >
            <option value="0">Базовый</option>
            <option value="1">Средний</option>
            <option value="2">Повышенный</option>
          </select>
        </div>
        <button type="submit" className="b2">
          Отправить
        </button>
        <div className="design2"></div>
      </form>
      <button onClick={() => window.open("https://strevesuksess.github.io/Portfolio/", "_blank")} className="ad-banner">
         <h1 className='ad-text'>Best frontend dev ever</h1>
        </button>
        <div className="hat">
          <form className="hat-title">
            Conspects - лучшее решение для ваших конспектов
            <div className="hat-circle"></div>
            <button type="submit" className="hat-rectangle">
              Узнать больше о Premium
            </button>
          </form>
        </div>
    </div>
  );
}

export default CreateConspects;