import { useForm, SubmitHandler } from 'react-hook-form';
import '../../App.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function StorageConspects() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    navigate('/');
  };

  return (
    <div align="center" class="first">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 align="center" class="text">
          Доступные конспекты
        </h1>

        <button onClick={handleGoBack} class="b3">
          Вернуться на главную
        </button>
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
  );
}

export default StorageConspects;