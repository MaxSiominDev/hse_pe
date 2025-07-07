import { useForm, SubmitHandler } from 'react-hook-form';
import '../../App.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function EditConspects() {
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleGoBack = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (textareaRef.current) {
      const textToCopy = textareaRef.current.value;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Ошибка копирования:', err);
          // Fallback для старых браузеров
          textareaRef.current.select();
          document.execCommand('copy');
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        });
    }
  };

  return (
    <div align="center" class="first">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 align="center" class="text">
          Редактор конспектов
        </h1>
        <div>
          <textarea
            ref={textareaRef}
            id="story"
            name="story"
            rows="30"
            cols="100"
            style={{ fontSize: '18px' }}
            class="area"
          > 
          <form className='areatext'>
            Здесь будет текст из файла...
            </form>
          </textarea>
        </div>
        <div class="buttoms">
          <button type="submit" className="b3">
            {isCopied ? 'Текст скопирован!' : 'Сохранить'}
          </button>
          <button onClick={handleGoBack} class="b3">
            Вернуться на главную
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditConspects;