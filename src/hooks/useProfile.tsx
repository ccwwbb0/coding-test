/* eslint-disable unicorn/filename-case */
import { useState } from 'react';

import logger from '../../api/src/libs/logger';
import axios from '../libs/api';

interface ProfileInfo {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
}

function useProfileInfo() {
  const [updateProfileRes, setUpdateProfileRes] = useState<ProfileInfo>();
  const [isUpdateProfileLoading, setIsUpdateProfileLoading] = useState(false);
  const [updateProfileErr, setUpdateProfileErr] = useState('');

  const [isEditMode, setEditMode] = useState(false);

  const updateProfileInfo = async (data: ProfileInfo) => {
    setIsUpdateProfileLoading(true);

    let res = {} as any;
    try {
      res = (await axios.post('/api/profile/', data)).data;
    } catch (error) {
      setIsUpdateProfileLoading(false);
      setUpdateProfileErr(error.response.data.error);
      setEditMode(true);
      return;
    }

    logger.log(res);
    setTimeout(() => {
      setUpdateProfileRes(res);

      setIsUpdateProfileLoading(false);
      setEditMode(false);
      setUpdateProfileErr('');
    }, 2000);
  };

  return {
    updateProfileRes,
    updateProfileInfo,
    isUpdateProfileLoading,

    updateProfileErr,

    isEditMode,
    setEditMode,
  };
}

export default useProfileInfo;
