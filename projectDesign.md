1. libs: 
   - @antd axios dayjs lodash nanoid react-redux styled-components ant-design/icons @ant-design/plots reduxjs/toolkit react-router-dom
   - @types/styled-components concurrently json-server

2. setting
   - environmental variables
   - npm start: .env.development.local, .env.local, .env.development, .env
   - npm run build: .env.production.local, .env.local, .env.production, .env
   - npm test: .env.test.local, .env.test, .env (note .env.local is missing)