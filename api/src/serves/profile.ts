import { Router } from 'express';

import getPrismaClient from '../libs/prisma';

const router = Router();

// 转义字符串的辅助函数
function escapeString(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\\/g, '&#x5c;')
    .replace(/\//g, '&#x2f;');
}

// 转义 JSON 的辅助函数
function escapeJson(json: object) {
  const safeJson = {} as any;

  for (const [key, value] of Object.entries(json)) {
    if (typeof value === 'string') {
      // 对字符串值进行转义
      safeJson[key] = escapeString(value);
    } else if (typeof value === 'object' && value !== null) {
      // 递归处理嵌套的对象
      safeJson[key] = escapeJson(value);
    } else {
      // 其他类型的值不做转义处理
      safeJson[key] = value;
    }
  }

  return safeJson;
}

// 修改
router.post('', async (req, res) => {
  const profileInfo = req.body;

  // 参数检查，此步骤一般通过中间件去完成
  if (!profileInfo.name || profileInfo.name === '') {
    res.status(400).json({ error: 'Missing Name parameter' });
    return;
  }
  if (!profileInfo.phoneNumber || profileInfo.phoneNumber === '') {
    res.status(400).json({ error: 'Missing PhoneNumber parameter' });
    return;
  }
  if (!profileInfo.email || profileInfo.email === '') {
    res.status(400).json({ error: 'Missing Email parameter' });
    return;
  }

  if (!profileInfo.name || profileInfo.name === '') {
    res.status(400).json({ error: 'Missing Name parameter' });
    return;
  }
  if (!profileInfo.phoneNumber || profileInfo.phoneNumber === '') {
    res.status(400).json({ error: 'Missing PhoneNumber parameter' });
    return;
  }
  if (!profileInfo.email || profileInfo.email === '') {
    res.status(400).json({ error: 'Missing Email parameter' });
    return;
  }

  if (profileInfo.name.length < 2 || profileInfo.name.length > 10) {
    res.status(400).json({ error: 'Name parameter should be between 2 and 10 characters.' });
    return;
  }
  const nameRegex = /^[a-zA-Z0-9]+$/;
  if (!nameRegex.test(profileInfo.name)) {
    res.status(400).json({ error: 'Name parameter must consist of only numbers or letters.' });
    return;
  }

  if (profileInfo.phoneNumber.length !== 11) {
    res.status(400).json({ error: 'PhoneNumber parameter must be 11 characters.' });
    return;
  }
  const numberRegex = /^[0-9]+$/;
  if (!numberRegex.test(profileInfo.phoneNumber)) {
    res.status(400).json({ error: 'PhoneNumber parameter must consist of only numbers.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(profileInfo.email)) {
    res.status(400).json({ error: 'Email format is incorrect.' });
    return;
  }

  // 没有id的话，新创建一条
  if (!profileInfo.id || profileInfo.id === '') {
    let resData = {};
    try {
      resData = await getPrismaClient().profile.create({
        data: {
          name: profileInfo.name,
          email: profileInfo.email,
          phoneNumber: profileInfo.phoneNumber,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Service error' });
      return;
    }
    // 转义输出的对象，防止xss攻击，一般也是通过中间件实现
    res.send(escapeJson(resData));
    return;
  }

  let resData = {};
  try {
    resData = await getPrismaClient().profile.update({
      where: {
        id: profileInfo.id,
      },
      data: {
        name: profileInfo.name,
        email: profileInfo.email,
        phoneNumber: profileInfo.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Service error' });
    return;
  }

  // 转义输出的对象，防止xss攻击，一般也是通过中间件实现
  res.send(escapeJson(resData));
});

export default router;
