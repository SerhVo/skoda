

export default function Header() {
const now = new Date();

    return (
      <>
        <header>
          <h1 >
            <a href="#" role="img"></a>
          </h1>
          <ul>
            <li>
              <a href="http://">Моделі</a>
            </li>
            <li>
              <a href="http://">Клієнтам Škoda</a>
            </li>
            <li>
              <a href="http://">Сервіс Škoda</a>
            </li>
            <li>
              <a href="http://">Прес-центр</a>
            </li>
            <li>
              <a href="http://">Про компанію</a>
            </li>
          </ul>
          <span>time: {now.toLocaleTimeString()}</span>
        </header>
      </>
    );
}
