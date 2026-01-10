import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';  // ← правильный путь из components

const AuthModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();  // ← берём функцию login из контекста

  const [mode, setMode] = useState('login'); // 'login' или 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Очень простая валидация (в реальном проекте — через библиотеку + backend)
    if (!email.includes('@')) {
      setError('Пожалуйста, введите корректный email');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }
    if (mode === 'signup' && name.trim().length < 2) {
      setError('Введите ваше имя');
      return;
    }

    // Вызываем login из контекста
    login(email, mode === 'signup' ? name.trim() : undefined);
    onClose(); // закрываем модалку после "успешного" входа
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className={`
          w-full max-w-md rounded-2xl bg-[#0f0f0f] p-8 text-white shadow-2xl
          transform transition-all duration-300 ease-out
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl text-gray-400 hover:text-white transition-colors"
        >
          <IoClose />
        </button>

        {/* Логотип и заголовок */}
        <div className="mb-8 text-center">
          <img
            src="/youtube.png"  // ← или полный путь, если у тебя в public
            alt="YouTube"
            className="mx-auto mb-3 h-10"
          />
          <h2 className="text-2xl font-medium">
            {mode === 'login' ? 'Вход' : 'Создать аккаунт'}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Продолжить с помощью Google или создать новый аккаунт
          </p>
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <div className="mb-4 rounded bg-red-900/50 p-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Поле имени — только при регистрации */}
          {mode === 'signup' && (
            <div className="mb-5">
              <label className="mb-1 block text-sm text-gray-300">Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border border-gray-600 bg-[#121212] px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Как вас будут видеть"
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="mb-1 block text-sm text-gray-300">Электронная почта</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-600 bg-[#121212] px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Пароль */}
          <div className="mb-6">
            <label className="mb-1 block text-sm text-gray-300">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-600 bg-[#121212] px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            className="w-full rounded bg-[#065fd4] py-3 font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>

        {/* Разделитель */}
        <div className="my-6 text-center text-sm text-gray-400">или</div>

        {/* Кнопка "Продолжить с Google" (имитация) */}
        <button className="flex w-full items-center justify-center gap-3 rounded border border-gray-600 bg-[#0f0f0f] py-3 font-medium hover:bg-[#1a1a1a] transition-colors">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="h-5 w-5"
          />
          Продолжить с Google
        </button>

        {/* Переключение режима */}
        <div className="mt-6 text-center text-sm">
          {mode === 'login' ? (
            <>
              Нет аккаунта?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-medium text-blue-400 hover:underline"
              >
                Создать аккаунт
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-medium text-blue-400 hover:underline"
              >
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;