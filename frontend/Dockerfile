# 使用官方Node.js镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装pnpm和serve
RUN npm install -g pnpm serve

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码和环境变量文件
COPY . .

# 构建应用
RUN pnpm run build

# 设置环境变量（从.env文件中的内容）
ENV VITE_BACKEND_PATH="http://localhost:9090"
ENV VITE_LOGIN_TOKEN="login_token"

# 暴露端口
EXPOSE 3000

# 使用serve启动静态文件服务
CMD ["serve", "-s", "dist", "-l", "3000"]