# 环境变量配置说明

## DEEPSEEK_API_KEY 配置

### 1. 获取 DeepSeek API Key

1. 访问 [DeepSeek 官网](https://platform.deepseek.com/)
2. 注册/登录账号
3. 进入 API Keys 页面
4. 创建新的 API Key

### 2. 配置本地开发环境

在项目根目录的 `.env.local` 文件中配置：

```bash
DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here
```

**注意：**
- 将 `your_actual_deepseek_api_key_here` 替换为你真实的 DeepSeek API Key
- `.env.local` 文件不会被提交到 Git（已在 .gitignore 中）
- 不要在代码中直接硬编码 API Key

### 3. 配置 Vercel 部署环境

部署到 Vercel 时，需要在 Vercel Dashboard 中配置环境变量：

1. 进入你的 Vercel 项目设置
2. 选择 **Settings** → **Environment Variables**
3. 添加以下环境变量：
   - **Key**: `DEEPSEEK_API_KEY`
   - **Value**: 你的 DeepSeek API Key
   - **Environment**: 选择 `Production`, `Preview`, `Development`（全部勾选）

### 4. 验证配置

本地开发时，API Key 会从 `.env.local` 文件中读取。

部署到 Vercel 后，API Key 会从 Vercel 的环境变量中读取。

### 5. 安全提示

- ✅ API Key 存储在服务端环境变量中，不会暴露给前端
- ✅ 使用 Vercel Serverless Functions 作为中间层，保护 API Key
- ✅ 前端只调用 `/api/chat` 接口，不直接接触 API Key
- ❌ 不要将 `.env.local` 文件提交到版本控制系统
- ❌ 不要在公开的代码仓库中暴露 API Key

### 6. 系统提示词配置

小北的系统提示词已预留占位符 `XIAOBEI_SYSTEM_PROMPT_PLACEHOLDER`，请在 `api/chat.ts` 文件中替换为实际的系统提示词。
