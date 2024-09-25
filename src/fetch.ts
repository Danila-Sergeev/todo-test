import axios from "axios";

// Интерфейс для типизации данных ответа
interface Pet {
  id: number;
  name: string;
  photoUrls: string[];
  tags: { name: string }[];
  status: string;
}

// Функция для выполнения GET-запроса
export async function fetchPets() {
  try {
    // Запрос к API
    const response = await axios.get<Pet[]>(
      "https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available"
    );

    // Вывод данных в консоль
    console.log(response.data);
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
}

// Вызов функции для выполнения запроса
