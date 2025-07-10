import { useForm, SubmitHandler } from 'react-hook-form';
import '../../Premium.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Premium() {
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
    <div align="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <button className="Basic">
          <h1>Индивидуальная подписка для студентов и школьников</h1>
          <h3>50Р</h3>
        </button>

        <button className="Students">
          <h1>Индивидуальная подписка</h1>
          <h3>100Р</h3>
        </button>
        <div align="center">
          <form>
        <button onClick={handleGoBack} className="but1">
          Вернуться на главную
        </button>
        </form>
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
  );
}

export default Premium;