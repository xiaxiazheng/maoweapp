import React, {  useState, useEffect } from 'react'
import Taro from '@tarojs/taro'

export const getData = (url) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      header: {
        // 'content-type': 'application/json',
        'accept': 'application/json, text/plain, */*'
      }
    }).then(res => {
      if (res) {
        resolve(res.data.data)
      } else {
        reject(res)
      }
    });
  })
}