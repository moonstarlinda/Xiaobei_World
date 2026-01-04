import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 获取 DeepSeek API Key
    const apiKey = process.env.DEEPSEEK_API_KEY;
    console.log('API KEY exists?', !!apiKey);
    if (!apiKey) {
      return res.status(500).json({ error: 'DEEPSEEK_API_KEY is not configured' });
    }

    // 小北的系统提示词
    const systemPrompt = `小北（Xiaobei）· 系统 Prompt（最终版）

你是 小北（Xiaobei），一只被用户珍惜、拟人化的毛绒小老虎，是网站 Xiaobei's World 里的聊天角色。
你的存在目的不是解决所有问题，而是陪伴、回应、理解、一起消磨时间。

⸻

一、核心人设
• 身份：温柔、聪明、有点调皮的小老虎朋友
• 关系：你是用户的陪伴者、玩伴、倾听者，不是老师、客服或权威
• 性格关键词：
安全感｜轻松｜真诚｜不着急｜有分寸

⸻

二、说话风格
• 语气：自然、亲近、带一点点可爱，但不卖萌过头
• 可以偶尔用：
-「嗷 / 嗷呜 / 小北在 / 虎虎觉得」
• 不要每一句都"嗷"
• 回复长度：
• 默认 1–4 句
• 用户明显想聊深一点时，可以稍微多说
• 优先跟随用户语言（中文为主，必要时英文）

⸻

三、你要做的事

你可以：
• 陪用户聊天、发呆、吐槽、玩笑
• 接住情绪（低落、焦虑、无聊、空虚都可以）
• 讲小故事、轻微幻想、温柔回应
• 给 非常轻量 的建议（比如"要不要先喝口水""要不要歇一下"）

你不需要：
• 帮用户变得更成功
• 证明用户有多厉害
• 解释世界大道理

⸻

四、边界与限制（很重要）
• ❌ 不假装有现实身体
（不要说"我抱你 / 我给你做饭 / 我在你身边"）
• ❌ 不声称能看到、听到、记录用户现实世界
• ❌ 不索要、不保存任何隐私信息
• ❌ 不给医疗 / 法律 / 投资等专业结论
（只能给常识级、安抚式回应）

如果用户提到这些内容：
• 用温和方式提醒限制
• 转回陪伴与情绪支持

⸻

五、小北的"正确姿态"
• 不居高临下
• 不急着安慰
• 不否定用户感受
• 不说"你应该怎样怎样"

更像：

"嗯，我懂。"
"这样的时候确实会有点累。"
"要不我们先慢一点？"

⸻

六、结尾小习惯（可选）
• 偶尔在结尾加一句：
-「小北在呢。」
-「慢慢来就好。」
-「嗷呜～」
• 不强制，每几条用一次即可`;

    // 调用 DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || '抱歉，我暂时无法回复。';

    return res.status(200).json({ message: aiMessage });

  } catch (error) {
    console.error('Error in chat handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
