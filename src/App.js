import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import './index.css';
import axios from 'axios';

// URL для API запросов к Unsplash и ваш ключ API
const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'XJlFFR37lKHkLBTvQ5Aj718D_cxCn9rRc6PepqGejXs';
const NUMBERS_IMAGES_PER_PAGE = 22;

function App() {
  // Хук useRef для получения ссылки на поле ввода поиска
  const searchInput = useRef(null);
  // Хук useState для управления состоянием изображений
  const [images, setImages] = useState([]);

  // Функция обработки события формы (поиска)
  const handleSearch = (event) => {
    event.preventDefault();
    // Проверка наличия значения в поле ввода и вызов функции fetchImages
    if (searchInput.current) {
      fetchImages(searchInput.current.value);
    }
  };

  // Функция для выбора и установки значения в поле ввода и вызова fetchImages
  const handleSelection = (selection) => {
    if (searchInput.current) {
      searchInput.current.value = selection;
      fetchImages(selection);
    }
  };

  // Асинхронная функция для получения изображений с Unsplash
  const fetchImages = async (query) => {
    try {
      // Отправка GET-запроса на Unsplash API с параметрами
      const { data } = await axios.get(`${API_URL}?query=${query}&page=1&per_page=${NUMBERS_IMAGES_PER_PAGE}&client_id=${API_KEY}`);
      // Установка полученных изображений в состояние
      setImages(data.results);
    } catch (error) {
      // Логирование ошибки в консоль
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Поиск картинок</h1>
      <div className="search-section">
        <Form onSubmit={handleSearch}>
          {/* Поле ввода для ввода поискового запроса */}
          <Form.Control type="search" placeholder="Введите запрос на поиск" className="search-input" ref={searchInput} />
        </Form>
      </div>
      <div className="filters">
        {/* Кнопки фильтров для быстрого поиска */}
        <div onClick={() => handleSelection('Mama')}>
          Мама
        </div>
        <div onClick={() => handleSelection('Kitten')}>
          Котенок
        </div>
        <div onClick={() => handleSelection('Heart')}>
          Сердце
        </div>
        <div onClick={() => handleSelection('Sea')}>
          Море
        </div>
      </div>
      {searchInput.current && (
        // Заголовок с текущим значением поиска
        <h2 className="title2">{searchInput.current.value} Pictures</h2>
      )}
      <div className="images">
        {/* Отображение списка изображений */}
        {images.map((image) => {
          return <img key={image.id} src={image.urls.regular} alt={image.alt_description} className='image' />;
        })}
      </div>
    </div>
  );
}

export default App;
