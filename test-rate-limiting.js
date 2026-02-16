#!/usr/bin/env node

/**
 * 测试限流逻辑的脚本
 * 模拟发送多次请求，验证是否会触发限流
 */

import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000/api/chat';

async function testRateLimiting() {
  console.log('开始测试限流逻辑...');
  console.log('='.repeat(50));

  // 构建消息历史，模拟连续对话
  const messagesHistory = [];

  // 不同的测试消息
  const testMessages = [
    "小北，你好！",
    "小北，今天心情怎么样？",
    "小北，你喜欢吃什么呀？",
    "小北，今天天气真好！",
    "小北，最近过得怎么样？",
    "小北，你有什么爱好吗？"
  ];

  for (let i = 1; i <= 6; i++) {
    const testMessage = testMessages[i - 1];
    console.log(`\n发送第 ${i} 次请求...`);
    console.log(`消息内容: ${testMessage}`);
    
    try {
      // 构建完整的消息历史
      const currentMessages = [
        ...messagesHistory,
        {
          role: 'user',
          content: testMessage
        }
      ];
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': 'test-session-123' // 添加会话标识符
        },
        body: JSON.stringify({
          message: testMessage,
          messages: currentMessages
        }),
      });

      const data = await response.json();
      console.log(`响应状态: ${response.status}`);
      console.log(`响应内容: ${JSON.stringify(data, null, 2)}`);

      if (response.status === 429) {
        console.log('\n✅ 限流触发成功！');
        break;
      } else if (response.status === 200) {
        // 更新消息历史，添加当前请求和响应
        messagesHistory.push(
          {
            role: 'user',
            content: testMessage
          },
          {
            role: 'assistant',
            content: data.message
          }
        );
      }
    } catch (error) {
      console.error('请求失败:', error.message);
    }

    // 等待1秒再发送下一次请求
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n' + '='.repeat(50));
  console.log('测试完成');
}

// 测试开发环境重置功能
async function testDevelopmentReset() {
  console.log('\n\n测试开发环境重置功能...');
  console.log('='.repeat(50));

  // 发送第一次请求
  console.log('\n发送第一次请求（模拟页面刷新后）...');
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: '测试重置功能',
        messages: [] // 空的消息历史，模拟新会话
      }),
    });

    const data = await response.json();
    console.log(`响应状态: ${response.status}`);
    console.log(`响应内容: ${JSON.stringify(data, null, 2)}`);
  } catch (error) {
    console.error('请求失败:', error.message);
  }
}

// 运行测试
testRateLimiting().then(testDevelopmentReset);