# SoftX · NEXUS Science — клиент

Веб-интерфейс SoftX для загрузки публикаций, PDF X-Ray, сопоставления и экспорта данных. Клиент соответствует интерфейсу s0ftx.ru. Сервер Flask и инструкция по его запуску находятся в репозитории [softx-science](https://github.com/SaSitme/softx-science).

## Локальный запуск

1. Запустите сервер SoftX из его репозитория по инструкции. По умолчанию он слушает порт 8000.
2. Клонируйте этот репозиторий и запустите клиент через Node.js 18 или новее.

   ```sh
   git clone https://github.com/SaSitme/softx-science-client.git
   cd softx-science-client
   node dev-server.mjs
   ```

3. Откройте [http://127.0.0.1:5173](http://127.0.0.1:5173). Локальный сервер клиента передаёт запросы к `/api/` серверу Flask.

Для нестандартных портов задайте переменные `CLIENT_PORT` и `SOFTX_API_PORT`.
