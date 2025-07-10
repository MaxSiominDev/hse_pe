import { useForm, SubmitHandler } from 'react-hook-form';
import '../../App.css';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom'

const server_url = "http://89.169.183.150:8080"

  function EditConspects() {
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const { id } = useParams();


  const handleGoBack = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
      } = useForm();

  useEffect(() => {

    const fetchData = async () => {
      try {
       const response = await fetch(server_url + `/api/notes/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Заметка не найдена');
        }
        throw new Error('Ошибка при получении заметки');
      }

      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    }

    fetchData()
    
  }, [])

  const onSubmit = async (data) => {
    
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

  if (!responseData) return <p>Loading</p>

  return (
    <div>
      <div align="center" className="first">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 align="center" className="text">
            Редактор конспектов
          </h1>
          <div className="b_ad">Здесь могла быть ваша реклама</div>
          <div className="b_ad2">Здесь могла быть ваша реклама</div>
          <div>
            <textarea
              ref={textareaRef}
              id="story"
              name="story"
              rows="30"
              cols="100"
              style={{ fontSize: '18px' }}
              className="area"
              defaultValue={responseData.text}
            >
            </textarea>
          </div>
          <div className="buttoms">
            <button type="submit" className="b3">
              {isCopied ? 'Текст скопирован!' : 'Сохранить'}
            </button>
            <button onClick={handleGoBack} className="b3">
              Вернуться на главную
            </button>
          </div>
        </form>
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
    </div>
  );
}

export default EditConspects;
