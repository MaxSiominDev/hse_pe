import { useForm, SubmitHandler } from 'react-hook-form';
import '../../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditConspects() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <div align="center" class="first">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 align="center" class="text">
          Редактор конспектов.
        </h1>
        <div>
          <textarea
            id="story"
            name="story"
            rows="30"
            cols="100"
            style={{ fontSize: '18px' }}
            class="area"
          >
            Здесь будет текст из файла...
          </textarea>
        </div>
        <div class="buttoms">
          <button type="submit" class="b3">
            Сохранить
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
