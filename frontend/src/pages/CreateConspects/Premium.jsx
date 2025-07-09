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
        <div className="Basic">
          <h2>Индивидуальная подписка</h2>
          <h5>100Р</h5>
        </div>
        <button onClick={handleGoBack}>Вернуться на главную</button>
      </form>
    </div>
  );
}

export default Premium;
