/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable unicorn/filename-case */
import './profile.css';

import { useState } from 'react';

// import logger from '../../api/src/libs/logger';
import useProfileInfo from '../hooks/useProfile';

function ProfileComponent() {
  const { setEditMode, isEditMode, updateProfileRes, updateProfileErr, updateProfileInfo, isUpdateProfileLoading } =
    useProfileInfo();

  const [name, setName] = useState('test');
  const [phoneNumber, setPhoneNumber] = useState('15111111111');
  const [email, setEmail] = useState('test@qq.com');

  const submit = (e: any) => {
    e.preventDefault();

    updateProfileInfo({
      id: updateProfileRes?.id,
      name,
      email,
      phoneNumber,
    });
  };

  const onEditBtnClick = () => {
    setEditMode(true);
  };

  return (
    <div>
      <form onSubmit={submit} className="form-container">
        <div className="form">
          <h3>{isEditMode ? '请编辑' : 'ProfileInfo'}</h3>

          {updateProfileErr !== '' ? <div>error: {updateProfileErr}</div> : ''}
          {updateProfileRes?.id ? <div>id: {updateProfileRes?.id}</div> : ''}

          <div className="form-group">
            <label>姓名</label>
            <input
              readOnly={!isEditMode}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              maxLength={10}
              pattern="[A-Za-z0-9]+"
              type="text"
              name="name"
              title="请不要使用其他字符"
              value={name}
              placeholder="2~10位，只能是字母数字"
            />
          </div>
          <div className="form-group">
            <label>电话号码</label>
            <input
              readOnly={!isEditMode}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              minLength={11}
              maxLength={11}
              pattern="[0-9]+"
              title="格式不规范"
              value={phoneNumber}
              type="tel"
              name="tel"
              placeholder="请输入11位手机号"
            />
          </div>
          <div className="form-group">
            <label>电子邮件</label>
            <input
              readOnly={!isEditMode}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="格式不规范"
              value={email}
              type="email"
              name="email"
              placeholder="请输入电子邮件"
            />
          </div>
          <div>
            <button hidden={!isEditMode} disabled={isUpdateProfileLoading} type="submit">
              {isUpdateProfileLoading ? '保存中..' : '保存'}
            </button>
          </div>
          <button hidden={isEditMode} type="button" onClick={onEditBtnClick}>
            编辑
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileComponent;
